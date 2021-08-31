import {SubnetConfiguration, SubnetType, VpcProps} from "@aws-cdk/aws-ec2";
import * as ec2 from "@aws-cdk/aws-ec2";
import {Settings} from "./settings";
import {Construct} from "@aws-cdk/core";

export class Vpc {

    private readonly scope: Construct;
    private readonly settings: Settings;
    private readonly env: string;

    constructor(scope: Construct, settings: Settings) {
        this.scope = scope;
        this.settings = settings;
        this.env = settings.environment;
    }

    public buildVpc = () => {
        return new ec2.Vpc(this.scope, `${this.env}-vpc`, this.getVpcProps());
    }

    private getVpcProps = (): VpcProps => {
        return {
            cidr: '10.0.0.0/24',
            natGateways: 0,
            maxAzs: 2,
            subnetConfiguration: this.getSubnetConfiguration()
        }
    }

    private getSubnetConfiguration = (): Array<SubnetConfiguration> => {
       return [
            {
                name: `${this.env}-${this.settings.projectName}-subnet`,
                subnetType: SubnetType.PUBLIC
            },
        ];
    }
}
