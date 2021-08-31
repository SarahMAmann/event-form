#!/usr/bin/env bash

echo off > /dev/null
echo "----- build-db.sh ----- BEGIN"

echo "Bring down existing containers and rebuild"
docker-compose -f ../docker-compose.yml down &
docker-compose --file ../docker-compose.yml build --parallel db &
wait

echo "DB built!"

echo "----- build-db.sh ----- END"
