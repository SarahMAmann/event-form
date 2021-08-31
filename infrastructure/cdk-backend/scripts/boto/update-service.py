import sys
import boto3
import json
import os
import botocore.exceptions

cluster_name = str(sys.argv[1])
service_name = str(sys.argv[2])

env = os.environ.get('NODE_ENV')

client = boto3.client('ecs', region_name='us-east-1')

try:
    description = client.describe_services(cluster= cluster_name, services=[ service_name ])

    current_count = description['services'][0]['desiredCount']

    updated_count = (current_count , 1)[current_count <= 1]

    client.update_service(cluster=cluster_name, service=service_name, desiredCount=updated_count)

    print(f'service {service_name} desiredCount updated to: {updated_count}')
except botocore.exceptions.__dict__.items():
    print("Invalid count number")
