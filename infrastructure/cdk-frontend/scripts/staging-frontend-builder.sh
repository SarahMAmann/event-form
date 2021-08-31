#!/bin/bash

###Call cli build command.
export NODE_ENV=staging
export AWS_ACCOUNT_ID=
export RELATIVEROOT='../'
(cd $RELATIVEROOT && npm install)
(cd $RELATIVEROOT && npm run build)
(cd $RELATIVEROOT && cdk synth --output=templates)
(cd $RELATIVEROOT && cdk bootstrap)
(cd $RELATIVEROOT && cdk deploy --outputs-file outputs/$NODE_ENV-outputs.json --require-approval never)
