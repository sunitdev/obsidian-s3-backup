import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as iam from 'aws-cdk-lib/aws-iam';

import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ObsidianS3BackupStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      ...props,
      stackName: 'ObsidianS3Backup'
    });

    const backupBucket = new s3.Bucket(this, 'obsidian-backup-bucket', {bucketName: 'sunit-obsidian-backup'})

    // Create IAM user
    const backupUser = new iam.User(this, 'obsidian-backup-user', {
      userName: 'obsidian-backup-user'
    });

    // Key user read and write access to bucket
    backupBucket.grantReadWrite(backupUser);

    // Generate access key and secret
    const accessKey = new iam.CfnAccessKey(this, 'CfnAccessKey', {
      userName: backupUser.userName,
    });

    // Output needed config
    new cdk.CfnOutput(this, 's3BucketName', {value: backupBucket.bucketName});

    new cdk.CfnOutput(this, 'accessKeyId', {value: accessKey.ref});
    new cdk.CfnOutput(this, 'secretAccessKey', {value: accessKey.attrSecretAccessKey});
  }

}
