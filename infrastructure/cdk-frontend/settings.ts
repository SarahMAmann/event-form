import * as config from 'config'

export interface ISettings {
    sites: Array<ISite>;
    environment: string;
    awsAccount: string;
    projectName: string;
    domain: string;
}

export interface ISite {
    projectName: string;
    domain: string;
    subdomain: string;
    relativeSitePath: string;
}

export class Settings implements ISettings {
    public readonly sites: Array<ISite>;
    public readonly environment: string;
    public readonly awsAccount: string;
    public readonly projectName: string;
    public readonly domain: string;

    constructor() {
        this.sites = JSON.parse(JSON.stringify(this.getByKey('sites')));
        this.projectName = this.getByKey('projectName');
        this.domain = this.getByKey('domain');
        this.environment = this.forceEnvValue('NODE_ENV');
        this.awsAccount = this.forceEnvValue('AWS_ACCOUNT_ID');
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
