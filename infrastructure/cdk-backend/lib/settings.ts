import * as config from 'config';

export interface IEnvObject {
    [key: string]: string
}

export interface IContainerDetails {
    containerName: string,
    port: number,
    cpu: number,
    memory: number,
    envs: IEnvObject,
    isAccessPoint: boolean,
    isEssential: boolean
}

export class Settings {
    public readonly projectName: string;
    public readonly awsAccount: string;
    public readonly environment: string;
    public readonly containerDetails: Array<IContainerDetails>;
    public readonly apiContainerName: string;
    public readonly apiContainerPort: number;
    public readonly apiTargetGroupHealthCheck: string;
    public readonly identityContainerName: string;
    public readonly identityContainerPort: number;
    public readonly identityServerTargetGroupHealthCheck: string;
    public readonly numberOfTasks: number;
    public readonly serviceName: string;
    public readonly taskCpu: number;
    public readonly taskMemory: number;
    public readonly sslCertificateArn: string;
    public readonly domainName: string;
    public readonly identityServerDatabaseName: string;
    public readonly appDatabaseName: string;
    public readonly vpcId: string;

    constructor() {
        this.projectName = this.getByKey('projectName') || 'projectNamePlaceholder'
        this.awsAccount = this.forceEnvValue('AWS_ACCOUNT_ID')
        this.environment = this.forceEnvValue('NODE_ENV');
        this.containerDetails = JSON.parse(JSON.stringify(this.getByKey('containers')));
        this.apiContainerName = this.getByKey('apiContainerName');
        this.apiContainerPort = Number(this.getByKey('apiContainerPort'));
        this.apiTargetGroupHealthCheck = this.getByKey('apiTargetGroupHealthCheck');
        this.identityContainerName = this.getByKey('identityContainerName');
        this.identityContainerPort = Number(this.getByKey('identityContainerPort'));
        this.identityServerTargetGroupHealthCheck = this.getByKey('identityServerTargetGroupHealthCheck');
        this.numberOfTasks = Number(this.getByKey('numberOfTasks'));
        this.serviceName = this.getByKey('serviceName');
        this.taskCpu = Number(this.getByKey('taskCpu'));
        this.taskMemory = Number(this.getByKey('taskMemory'));
        this.sslCertificateArn = this.getByKey('sslCertificateArn');
        this.domainName = this.getByKey('domainName');
        this.vpcId = this.getByKey('vpcId');
        this.identityServerDatabaseName = this.getByKey('rds.identityServerDatabaseName');
        this.appDatabaseName = this.getByKey('rds.appDatabaseName');
    };

    private getByKey = (key: string): string => {
        return config.has(key) ? config.get(key) : '';
    }

    private forceEnvValue = (envName: string)  => {
        if (process.env?.[envName]) {
            return process.env?.[envName] as string;
        }
        throw new Error(`Env not found in Settings: ${envName}`);
    }
}
