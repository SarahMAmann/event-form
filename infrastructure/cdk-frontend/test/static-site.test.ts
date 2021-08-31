// import {App} from '@aws-cdk/core';
// import '@aws-cdk/assert/jest';
// import {StaticSiteStack} from '../index'
// import {ISettings, Settings} from '../settings';

// jest.mock('../settings', () => ({
//     Settings: jest.fn().mockImplementation(() => ({
//         domain: 'cool.com',
//         subdomain: 'www',
//         relativeSitePath: './site-contents',
//         environment: 'test',
//         awsAccount: '1111111111'
//     }))
// }));

// let stack: StaticSiteStack, settings: ISettings;

// beforeEach(() => {
//     const app = new App();
//     settings = new Settings()
//     stack = new StaticSiteStack(app, 'test', {env: {account: settings.awsAccount, region: 'us-east-1'}}, settings)

// });

// test('Bucket created with correct properties', () => {
//     expect(stack).toHaveResource('AWS::S3::Bucket', {
//         BucketName: `${settings.subdomain}.${settings.domain}`,
//         WebsiteConfiguration: {
//             IndexDocument: "index.html"
//         }
//     });
// });

//TODO add more test. Cert is difficult to test.
