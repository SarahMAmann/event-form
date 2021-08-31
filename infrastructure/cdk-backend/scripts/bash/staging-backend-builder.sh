#!/bin/bash

###Call cli build command.
export NODE_ENV=staging
export AWS_ACCOUNT_ID=
export RELATIVEROOT='../../'

# **** DO NOT change this value! ****
APPSTACK="$NODE_ENV-AppStack"
# **** DO NOT change this value! ****

(cd $RELATIVEROOT && npm install)
(cd $RELATIVEROOT && npm run build)
(cd $RELATIVEROOT && cdk synth --output=templates --verbose)
(cd $RELATIVEROOT && cdk deploy --outputs-file outputs/$NODE_ENV-outputs.json --verboses --require-approval never)
OUTPUTLOCATION="../../outputs/$NODE_ENV-outputs.json"
TASKARN=$(python3 ../python/fetch-task-arn.py $OUTPUTLOCATION $APPSTACK)
TASKDEFOUTPUT='../../task-definitions'
(cd ../boto/ && pip3 install -r requirements.txt && python3 retrieve-task-def.py $TASKARN $TASKDEFOUTPUT )

