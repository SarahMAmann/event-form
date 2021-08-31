import {Settings} from "./settings";
import {Construct, Duration} from "@aws-cdk/core";
import {IVpc} from "@aws-cdk/aws-ec2";
import {
    ApplicationListener,
    ApplicationLoadBalancer,
    ApplicationLoadBalancerProps,
    ApplicationProtocol,
    ApplicationTargetGroup,
    IListenerCertificate,
    ListenerAction, ListenerCondition,
    TargetType
} from "@aws-cdk/aws-elasticloadbalancingv2";
import {ITargetContainers} from "./backend-stack";

export interface IAlb {
    buildApplicationLoadBalancer(): ApplicationLoadBalancer,
    createListeners(alb: ApplicationLoadBalancer, targetContainers: ITargetContainers): void
}

export class Alb implements IAlb {

    private readonly settings: Settings;
    private readonly scope: Construct;
    private readonly env: string;
    private readonly vpc: IVpc;

    constructor(scope: Construct, settings: Settings, vpc: IVpc) {
        this.settings = settings;
        this.scope = scope;
        this.env = settings.environment;
        this.vpc = vpc;
    }

    public buildApplicationLoadBalancer = (): ApplicationLoadBalancer => {
        const albProps: ApplicationLoadBalancerProps = {
            loadBalancerName: `${this.env}-${this.settings.projectName}-alb`,
            internetFacing: true,
            vpc: this.vpc
        }
        return new ApplicationLoadBalancer(this.scope, `${this.env}-${this.settings.projectName}-alb`, albProps);
    }

    public createListeners = (alb: ApplicationLoadBalancer, targetContainers: ITargetContainers): void => {

        const defaultTargetGroup: ApplicationTargetGroup = new ApplicationTargetGroup(this.scope, "https-default-target-group",
            {
                vpc: this.vpc,
                port: 80,
                targets: [targetContainers.apiContainer.containerTarget],
                healthCheck: {
                    path: targetContainers.apiContainer.healthCheckRoute,
                    interval: Duration.minutes(1),
                    port: "5000"
                }
            })

        const certificates: Array<IListenerCertificate> = [{certificateArn: this.settings.sslCertificateArn}];

        const httpsListener: ApplicationListener = alb.addListener('httpsListener',
            {
                port: 443,
                open: true,
                certificates: certificates,
                defaultTargetGroups: [defaultTargetGroup]
            }
        );

        const httpAction = {
            action: ListenerAction.redirect({
                permanent: true,
                protocol: ApplicationProtocol.HTTPS,
                port: '443',
            })
        };

        alb.addListener('httpListener',
            {
                defaultAction: httpAction.action,
                port: 80,
                open: true
            }
        );
        //TODO drive port from config
        httpsListener.addTargets("ecs-identityServer-target-group", {
            port: 80,
            priority: 1,
            targets: [targetContainers.identityServerContainer.containerTarget],
            conditions: [
                ListenerCondition.hostHeaders([`${this.env}-identity.${this.settings.domainName}`])
            ],
            healthCheck: {
                path: targetContainers.identityServerContainer.healthCheckRoute,
                interval: Duration.minutes(1),
                port: "5001"
            }
        });
    }
}
