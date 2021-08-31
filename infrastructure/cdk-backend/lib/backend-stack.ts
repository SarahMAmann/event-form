import {App, CfnOutput, Stack, StackProps} from "@aws-cdk/core";
import {EcsTaskBootstrapper} from "./task-definition";
import {Settings} from "./settings";
import {Vpc} from "./vpc";
import {Rds} from "./rds";
import * as ec2 from "@aws-cdk/aws-ec2";
import {ISecurityGroup} from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import {
    CfnService,
    ClusterProps, FargateService,
    FargateServiceProps,
    FargateTaskDefinition,
    IEcsLoadBalancerTarget,
    Protocol
} from "@aws-cdk/aws-ecs";
import {Alb, IAlb} from "./alb";
import {IDatabaseInstance} from "@aws-cdk/aws-rds";
import {Route53} from "./route-53";

export interface ITarget {
    containerTarget: IEcsLoadBalancerTarget,
    healthCheckRoute: string
}

export interface ITargetContainers {
    apiContainer: ITarget,
    identityServerContainer: ITarget
}


export class BackendStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        let vpc;
        super(scope, id, props);
        const settings = new Settings();
        const env = settings.environment;
        const serviceName = settings.serviceName;

        //Vpc
        if(!settings.vpcId) {
            vpc = new Vpc(this, settings).buildVpc();
        } else {
            vpc = ec2.Vpc.fromLookup(this,`${env}-vpc`, {vpcId: settings.vpcId})
        }

        //cluster
        const clusterProps: ClusterProps= {clusterName: `${env}`, vpc: vpc};
        const cluster = new ecs.Cluster(this, `${env}-${settings.projectName}-cluster`, clusterProps)

        //ALB
        const alb: IAlb = new Alb(this, settings, vpc);
        const albInstance = alb.buildApplicationLoadBalancer();

        //Ecs
        const taskDefinition: FargateTaskDefinition = new EcsTaskBootstrapper(this, settings).buildTaskDefinition();
        const serviceProps: FargateServiceProps = {
            serviceName: serviceName,
            cluster: cluster,
            taskDefinition: taskDefinition,
            assignPublicIp: true,
            desiredCount: settings.numberOfTasks < 1 ? 1 : settings.numberOfTasks
        }
        const appService: FargateService = new ecs.FargateService(this, `${env}-app-service`, serviceProps);

        //Sets the container the ALB will use as its default target
        const apiContainerTarget: IEcsLoadBalancerTarget = appService.loadBalancerTarget({
            containerName: `${settings.environment}-${settings.apiContainerName}`,
            containerPort: settings.apiContainerPort,
            protocol: Protocol.TCP
        })

        const identityServerContainerTarget: IEcsLoadBalancerTarget = appService.loadBalancerTarget({
            containerName: `${settings.environment}-${settings.identityContainerName}`,
            containerPort: settings.identityContainerPort,
            protocol: Protocol.TCP
        })

        const targetContainers: ITargetContainers = {
            apiContainer: {
                containerTarget: apiContainerTarget,
                healthCheckRoute: settings.apiTargetGroupHealthCheck
            },
            identityServerContainer: {
                containerTarget: identityServerContainerTarget,
                healthCheckRoute: settings.identityServerTargetGroupHealthCheck
            }
        }

        //To allow for deployment before images are available
        const node = appService.node;
        // fetches the underlying low level construct CfnService to override the desiredCount to 0, so the stack does not time out if no image is in place.
        const cfnService: CfnService = node.findChild('Service') as CfnService; //it just so happens to be named to Service if you check the source code.
        cfnService.desiredCount = 0;

        //Add listeners for https and redirect http
        if(settings.sslCertificateArn && settings.domainName) alb.createListeners(albInstance, targetContainers);

        //TODO: Add logic to make production recordNamePrefix as only "api" vs "production-api"
        //Add domain record to ALB
        if(settings.domainName) {
            const route53 = new Route53(this, settings, albInstance);
            route53.createRecordSetForALB(`${env}-api`);
            route53.createRecordSetForALB(`${env}-identity`);
        }

        //Security group for used to set RDS access
        const ecsSecurityGroups: ISecurityGroup[] = appService.connections.securityGroups

        //Rds
        const appRdsInstance: IDatabaseInstance = new Rds(this, settings, vpc, ecsSecurityGroups).buildRdsInstance("app",settings.appDatabaseName);
        const identityRdsInstance: IDatabaseInstance = new Rds(this, settings, vpc, ecsSecurityGroups).buildRdsInstance("identity", settings.identityServerDatabaseName);


        //Outputs
        new CfnOutput(this, 'ecs-service-name', {
            value: appService.serviceName,
            description: 'The name of the ecs service',
            exportName: `${env}-ecsServiceName`,
        });

        new CfnOutput(this, 'ecs-task-definition-arn', {
            value: taskDefinition.taskDefinitionArn,
            description: 'The arn of the ecs task-def',
            exportName: `${env}-ecsTaskDefArn`,
        });

        new CfnOutput(this, 'rds-host-app', {
            value: appRdsInstance.dbInstanceEndpointAddress,
            description: 'The connection-string of the app rds instance',
            exportName: `${env}-appRdsEndpointAddress`,
        });

        new CfnOutput(this, 'rds-host-identity', {
            value: identityRdsInstance.dbInstanceEndpointAddress,
            description: 'The connection-string of the identity server rds instance',
            exportName: `${env}-identityServerRdsEndpointAddress`,
        });

        new CfnOutput(this, 'vpc-id', {
            value: vpc.vpcId,
            description: 'The vpcId',
            exportName: `${env}-vpcId`,
        });
    }
}
