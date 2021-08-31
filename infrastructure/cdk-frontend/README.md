# Static site

This project creates the infrastructure for a static site, which uses an S3 bucket for storing the content.  The site contents (located in the 'site-contents' sub-directory) are deployed to the bucket.

The site redirects from HTTP to HTTPS, using a CloudFront distribution, Route53 alias record, and ACM certificate.

For a list of CDK commands: https://docs.aws.amazon.com/cdk/latest/guide/cli.html

## Prep

1. Get AWS AccountId.
2. Determine which env needs to be deployed.
3. Make sure the Hosted Zone record exists in Route53.

## Deploy
* Fill out or create an env specific config file in `/config`.
* Create a corresponding `{env}-frontend-builder.sh` file located in `/scripts`.
* Set AWS account number & env in `{env}-frontend-builder.sh`.

Then run:
```
$ npm install -g aws-cdk
$ (cd scripts && ./{env}-frontend-builder.sh)
```
This will deploy the static-site stack.


## Tear Down

If for some reason you would like to destroy the stack/site.

1. Delete the CF stack out in AWS.
2. Remove the S3 Bucket manually, which will have the same name as the domain.
