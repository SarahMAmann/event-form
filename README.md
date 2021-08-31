# Ladybird

Platform for Ladybird

    * Angular 9 frontend
    * .NET Core 3.1 backend
    * MariaDB
    * LocalStack (for AWS)
    * Docker

## TLDR;

```shell script
#Build and run local environment the first time (includes all migrations).
./run.sh --first

#Rebuild API container after changes (quick rebuild and run)
docker-compose up --build --detach api

#Restart UI container (if something goofy happens)
docker-compose restart ui

#Rebuild and run all containers without resetting DB
./run.sh

#Update database with latest migrations. Good if you've pulled changes and need to update the database.
./run.sh --migrations

#Update database with latest migrations and build and run when finished
./run.sh --migrations --run

#Start over with clean local environment, with a fresh, up-to-date database.
./run.sh --reset
```

## URLs

* [Angular App – http://localhost](http://localhost)
* [API – http://localhost:81](http://localhost:81)
* [AWS Services – http://localhost:4566](http://localhost:4566)
* [Localstack Dashboard – http://localhost:8080](http://localhost:8080)

## New Repo Setup

1. Search for `ladybird` and replace it with your project name as appropriate.
2. Set a different database password
    1. `docker-compose.yml`
        1. DB Service
            1. Root password
            2. App password
    2. `appsettings.Development.json` connection string in API project
3. Go into `browser`
    1. Run `nvm install` to be on the right version of Node (install `nvm` if you don't have it)
    2. Run `npm update` to update `package-lock.json` to latest versions (gives a nice list of updates and versions).
    3. Run `npm install` to update `package-lock.json` to latest versions of everything that didn't update.
    3. Peg versions in `package.json` to the versions that were downloaded (so that dependencies don't continually shift throughout the life of the project)
4. Commit to new repo!

## Not Long Enough; Keep Reading

Frontend code is in `browser` directory. Additional documentation [here](./browser/README.md). Like all documentation, it's probably out-of-date.

Backend code is in `server` directory. Additional documentation [here](./server/README.md). Like all documentation, it's probably out-of-date.

Helpful scripts are in `bash` directory. The code _is_ the documentation.
