//Define containers which will occupy the same service.
//See https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ecs.FargateTaskDefinitionProps.html
import * as ecs from "@aws-cdk/aws-ecs";
import {ContainerDefinitionOptions} from "@aws-cdk/aws-ecs/lib/container-definition";
import {Repository} from "@aws-cdk/aws-ecr";
import {IContainerDetails, Settings} from "./settings";
import {CfnOutput, Construct} from "@aws-cdk/core";

export class EcsTaskBootstrapper {

    private readonly settings: Settings;
    private readonly env: string;
    private readonly containerDetails: Array<IContainerDetails>;
    private readonly scope: Construct;

    constructor(scope: Construct, settings: Settings) {
        this.settings = settings;
        this.env = this.settings.environment;
        this.containerDetails = this.settings.containerDetails;
        this.scope = scope;
    }
    //TODO break into smaller functions
    public buildTaskDefinition = (): ecs.FargateTaskDefinition => {

        const taskDefinitionProps: ecs.FargateTaskDefinitionProps = {
            cpu: this.settings.taskCpu,
            memoryLimitMiB: this.settings.taskMemory
        }
        let taskDefinition = new ecs.FargateTaskDefinition(this.scope, `${this.env}-TaskDef`, taskDefinitionProps);
        for (let item of this.containerDetails) {
            let ecr = this.createEcr(item.containerName, this.env);
            let container: ContainerDefinitionOptions = {
                image: ecs.ContainerImage.fromEcrRepository(ecr, 'latest'),
                cpu: item.cpu,
                memoryLimitMiB: item.memory,
                environment: item.envs,
                logging: new ecs.AwsLogDriver({
                    streamPrefix: `${this.env}`
                }),
                essential: item.isEssential,
            }
            // taskDefinition.addToTaskRolePolicy() USE THIS TO ADD SERVICES TO ACCESS
            let currentTask = taskDefinition.addContainer(`${this.env}-${item.containerName}`, container);
            currentTask.addPortMappings({containerPort: item.port})

            //Outputs
            new CfnOutput(this.scope, `ecr-${ecr.node.uniqueId}`, {
                value: ecr.repositoryName,
                description: 'The name of ecr repo',
                exportName: `ecrRepo${ecr.node.uniqueId}`
            });

        }
        return taskDefinition;
    }

    private createEcr = (containerName: string, env: string) =>  {
        const name = containerName.toLowerCase();
        return new Repository(this.scope, `${env}-ecr-${name}`, {repositoryName: `${this.env}${name}`});
    }
}
