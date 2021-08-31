#!/usr/bin/env node
import cloudfront = require('@aws-cdk/aws-cloudfront');
import route53 = require('@aws-cdk/aws-route53');
import s3 = require('@aws-cdk/aws-s3');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import acm = require('@aws-cdk/aws-certificatemanager');
import cdk = require('@aws-cdk/core');
import targets = require('@aws-cdk/aws-route53-targets/lib');
import { Construct } from '@aws-cdk/core';
import { ISite } from './settings';

export interface StaticSiteProps {
    env: string;
    sites: Array<ISite>;
    domainName: string;
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class StaticSite extends Construct {
    constructor(parent: Construct, name: string, props: StaticSiteProps) {
        super(parent, name);

        const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: props.domainName });

        // TLS certificate, with wildcard
        const certificateArn = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
            domainName: `*.${props.domainName}`,
            hostedZone: zone,
            region: 'us-east-1', // Cloudfront only checks this region for certificates.
        }).certificateArn;

        new cdk.CfnOutput(this, 'Certificate', {
            value: certificateArn,
            description: 'certificate arn',
            exportName: `${props.env}certificateArn`
        });

        for (let site of props.sites) {
            const siteDomain = site.subdomain + '.' + site.domain;
            new cdk.CfnOutput(this, `${site.subdomain}Site`, { value: 'https://' + siteDomain });

            // Content bucket
            const siteBucket = new s3.Bucket(this, `${site.subdomain}SiteBucket`, {
                bucketName: siteDomain,
                websiteIndexDocument: 'index.html',
                publicReadAccess: true,
                // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
                // the new bucket, and it will remain in your account until manually deleted. By setting the policy to
                // DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
                removalPolicy: cdk.RemovalPolicy.RETAIN,
            });
            new cdk.CfnOutput(this, `${site.subdomain}Bucket`, {
                value: siteBucket.bucketName,
                description: 'Frontend Static bucket name',
                exportName: `${site.subdomain}FrontendStaticBucketName`,
            });

            // CloudFront distribution that provides HTTPS
            const distribution = new cloudfront.CloudFrontWebDistribution(this, `${site.subdomain}SiteDistribution`, {
                aliasConfiguration: {
                    acmCertRef: certificateArn,
                    names: [ siteDomain ],
                    sslMethod: cloudfront.SSLMethod.SNI,
                    securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
                },
                originConfigs: [
                    {
                        s3OriginSource: {
                            s3BucketSource: siteBucket
                        },
                        behaviors : [ {isDefaultBehavior: true}],
                    }
                ],
                errorConfigurations: [
                    {
                        errorCode: 403,
                        errorCachingMinTtl: 300,
                        responseCode: 200,
                        responsePagePath: "/index.html"
                    }
                ]

            });
            new cdk.CfnOutput(this, `${site.subdomain}DistributionId`, { value: distribution.distributionId });

            // Route53 alias record for the CloudFront distribution
            new route53.ARecord(this, `${site.subdomain}SiteAliasRecord`, {
                recordName: siteDomain,
                target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
                zone
            });

            // Deploy site contents to S3 bucket
            new s3deploy.BucketDeployment(this, `${site.subdomain}DeployWithInvalidation`, {
                sources: [ s3deploy.Source.asset(site.relativeSitePath) ],
                destinationBucket: siteBucket,
                distribution,
                distributionPaths: ['/*'],
              });
        }
    }
}
