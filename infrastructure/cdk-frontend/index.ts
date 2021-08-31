#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { StaticSite } from './static-site';
import {ISettings, Settings} from './settings';

/**
 * This stack relies on getting the domain name from CDK context.
 * Use 'cdk synth -c domain=mystaticsite.com -c subdomain=www'
 * Or add the following to cdk.json:
 * {
 *   "context": {
 *     "domain": "mystaticsite.com",
 *     "subdomain": "www"
 *   }
 * }
**/

export class StaticSiteStack extends cdk.Stack {

    constructor(parent: cdk.App, name: string, props: cdk.StackProps, settings: ISettings) {
        super(parent, name, props);

        new StaticSite(this, 'StaticSite', {
            env: settings.environment,
            sites: settings.sites,
            domainName: settings.domain,
        });
   }
}

const app = new cdk.App();
const settings = new Settings();

new StaticSiteStack(app, `${settings.environment}-${settings.projectName}-staticSite`, {
    env: {account: settings.awsAccount, region: 'us-east-1'}}, settings);

app.synth();
