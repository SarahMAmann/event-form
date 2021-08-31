# dotnet-core-starter
We Write Code .Net Core 3.1 Dockerized Web API Starter project

## .Net Core SDK
To install the SDK, open a terminal window and run the following command:
`dotnet tool install -g dotnet-ef --version 3.1`

## Configuration
Database - MariaDB version: 10.3.13
- Host: localhost
- User: root
- Password: startMeUp!
- Port: 3303

`docker-compose up` will create a database containing ASP.Net Identity tables and a single table called Bands. The InitialMigration file populates the Bands table when the migration is run against the database.

Local API URL: http://localhost:8086/api/bands

Swagger URL: http://localhost:8086/swagger

## Migrations

Click [here](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/) to view the EF Core migration documentation

### Run migrations against the database
* `cd ./Data`
* `dotnet ef database update`

### Auto-generate migrations based on model changes:
* `cd ./Data`
* `dotnet ef migrations add MyMigration`

### Revert database to a prior migration
* `cd ./Data`
* `dotnet ef database update 20190807192253_MyMigration`

### Revert the most recent migration file
If you already ran the latest migration and updated the database you'll want to revert the database changes before reverting the migration files.
* `cd ./Data`
* `dotnet ef migrations remove`

## Docker
### Install Docker
Click [here](https://docs.docker.com/install) to download the Docker tools

### Setup DotNet File Sharing
1. Open Docker -> Preferences... -> File Sharing  
1. Add an entry for this folder: `/usr/local/share/dotnet`

### How to build development Containers:
* `docker-compose build`
* `docker-compose up`
* `docker-compose down`

### How to SSH into a Container:
* `docker exec -it <container name> /bin/bash`

