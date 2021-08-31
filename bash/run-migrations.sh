#!/usr/bin/env bash

echo off > /dev/null
echo "----- run-migrations.sh ----- BEGIN"

echo "Install dotnet-ef"
dotnet tool restore

echo "Running migrations"
cd ../server/Data || exit
dotnet dotnet-ef database update
cd ../../bash || exit

echo "Migrations complete!"

echo "----- run-migrations.sh ----- END"
