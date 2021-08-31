### Boto scripts

Make sure pip3 is installed.

When installing on containerized instance:

```sh
$ cd boto
$ pip3 install -r requirements.txt
$ python3 {script_name.py} {args*}
```

Scripts:

* [retrieve-task-def --task-arn --output-path] - Gets task-definition from ecs and outputs it as json to specified directory.
   Example:
   ```sh
   $ python3 retrieve-task-def.py arn:11114344:something:task-def:1 /user/desktop/folder
   ```
* [update-service --cluster-name --service-name] - Scales up a service in a cluster
   ```sh
   $ python3 retrieve-task-def.py develop api
   ```
