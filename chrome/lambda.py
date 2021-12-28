from __future__ import print_function

import json
import urllib
import boto3
import os

print('Loading message function...')

def lambda_handler(event, context):
    if event["queryStringParameters"]["key"] == os.environ["KEY"]:
        send_to_sns(event["queryStringParameters"]["url"], context)
        message = "Message Sent!"
    else:
        message = "Invalid Key - try again"
    return {
        "statusCode": 200,
        "body": json.dumps(message)
    }

def send_to_sns(message,context):
    sns = boto3.client('sns')
    sns.publish(
        TopicArn="",
        Message=message
    )

    return ('Sent a message to an Amazon SNS topic.')
