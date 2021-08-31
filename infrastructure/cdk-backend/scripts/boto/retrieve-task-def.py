import sys
import boto3
import json
import os

task_arn = str(sys.argv[1])
destination_path = str(sys.argv[2])
env = os.environ.get('NODE_ENV')

client = boto3.client('ecs', region_name='us-east-1')
response = client.describe_task_definition(taskDefinition=task_arn)

task_def_obj = response['taskDefinition']

json = json.dumps(task_def_obj, indent=4)

f = open(destination_path + f"/{env}-task-def.json", "w")
f.write(json)
f.close()
