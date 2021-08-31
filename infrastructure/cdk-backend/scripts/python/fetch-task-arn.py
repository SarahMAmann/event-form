import json
import os
import sys

file_location = str(sys.argv[1])
stack_name = str(sys.argv[2])
env = os.environ.get('NODE_ENV')

with open(file_location) as file:
  data = json.load(file)
  arn = data[stack_name]['ecstaskdefinitionarn']
  print(arn)
