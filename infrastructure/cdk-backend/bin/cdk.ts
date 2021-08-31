#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BackendStack } from '../lib/backend-stack';
import {Settings} from '../lib/settings';
//TODO Figure out how to pass app name dynamically to 'fetch-task-arn.py' script so as to use app name in stackId
const settings = new Settings();
const app = new cdk.App();
new BackendStack(app, `${settings.environment}-AppStack`, {
    env: {account: settings.awsAccount, region: 'us-east-1'}
    }
);
