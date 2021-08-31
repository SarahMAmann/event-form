# Infrastructure Deployment

### Projects
* `cdk-frontend`: Deploy all infrastructure needed to host a static site. Includes s3 static site, Cloudfront distribution, and SSL cert.
* `cdk-backend`: Deploy all infrastructure needed for an API. Includes identity server & api containers, with respective RDS instances and loadbalancer.
* Github Actions: Used to deploy code on `push` to a specific branch.

### Requirements
1. AWS account number.
2. AWS Credentials for user/role with permissions to create resources in stack (Stored in local AWS Profile).
3. AWS Credentials for user/role with permissions to deploy to stack (Stored as Github Secrets).
4. Hosted Zone and Domain in Route53.
5. VpcId for AWS region where app is to be deployed (use us-east-1, unless project requires another).

### General Operation

1. Deploy `cdk-frontend`. Follow tutorial and acquire SSL Cert ARN.
2. Deploy `cdk-backend'. Follow tutorial and use VpcId and SSL Cert ARN created in the previous step.
3. Get RDS connection strings from Secrets Manager in AWS and add to Github Secrets.
4. Customize github workflow (from root, `.github/workflows`) to match env and app specifics.
5. Deploy code.

#### Remember:
* When both `cdk` projects have been deployed, the application will not function until code is successfully pushed via Github Actions, although there will be a static html page to indicate success for the frontend.

