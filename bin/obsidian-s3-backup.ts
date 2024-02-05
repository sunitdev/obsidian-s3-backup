#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ObsidianS3BackupStack } from '../lib/obsidian-s3-backup-stack';

const app = new cdk.App();
new ObsidianS3BackupStack(app, 'ObsidianS3BackupStack', {
  env: {  region: 'eu-west-1' },
});