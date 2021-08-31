import {Settings} from "./settings";
import {Construct, SecretValue} from "@aws-cdk/core";
import * as rds from "@aws-cdk/aws-rds";
import {
    InstanceType,
    InstanceClass,
    InstanceSize,
    IConnectable,
    Connections,
    ConnectionsProps, ISecurityGroup, SubnetType, IVpc
} from "@aws-cdk/aws-ec2";

import {Credentials, DatabaseInstance, DatabaseInstanceProps, IDatabaseInstance} from "@aws-cdk/aws-rds";
import {StringParameter} from "@aws-cdk/aws-ssm";

export interface IRds {
    buildRdsInstance(dbIdentifier: string, dbName: string): IDatabaseInstance,

    createSSMParameterEntry(entry: IParameterStoreProp): void
}

export interface IParameterStoreProp {
    name: string,
    description: string,
    value: string
}

export class Rds implements IRds{

    private readonly settings: Settings;
    private readonly scope: Construct;
    private readonly env: string;
    private readonly vpc: IVpc;
    private readonly incomingSecurityGroups: ISecurityGroup[];

    constructor(scope: Construct, settings: Settings, vpc: IVpc, incomingSecurityGroups: ISecurityGroup[]) {
        this.settings = settings;
        this.scope = scope;
        this.env = settings.environment;
        this.vpc = vpc;
        this.incomingSecurityGroups = incomingSecurityGroups;
    }

    public buildRdsInstance = (dbIdentifier: string, dbName: string): IDatabaseInstance => {
        const instance = new DatabaseInstance(this.scope, `${this.env}-${dbIdentifier}-database`, this.getRdsInstanceProps(dbIdentifier, dbName))
        instance.connections.allowDefaultPortFrom(this.getConnections());
        return instance;
    }

    public createSSMParameterEntry = (entry: IParameterStoreProp): void => {
        new StringParameter(this.scope, `${this.env}${entry.name}`, {
            parameterName: entry.name,
            description: entry.description,
            stringValue: entry.value
        });
    }

    private getRdsInstanceProps = (dbIdentifier: string, dbName: string): DatabaseInstanceProps => {
        const instanceSize = InstanceSize.MICRO;
        return {
            engine: rds.DatabaseInstanceEngine.mariaDb({version: rds.MariaDbEngineVersion.VER_10_4_13}),
            instanceType: InstanceType.of(InstanceClass.BURSTABLE2, instanceSize),
            instanceIdentifier: `${this.env}${dbIdentifier}database`,
            vpc: this.vpc,
            deletionProtection: true,
            storageEncrypted: instanceSize !== InstanceSize.MICRO,
            maxAllocatedStorage: 200,
            databaseName: dbName,
            vpcPlacement: {
                subnetType: SubnetType.PUBLIC,
            }
        }
    }

    private getConnections = (): IConnectable => {
        const connectionProps: ConnectionsProps = {
            securityGroups: this.incomingSecurityGroups
        }
        return new Connections(connectionProps)
    }
}
