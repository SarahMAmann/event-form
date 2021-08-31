#!/usr/bin/env bash

echo off > /dev/null
echo "----- docker-run.sh ----- BEGIN"

echo "Bring down existing containers and rebuild"
   docker-compose --file ../docker-compose.yml down --remove-orphans \
&& docker-compose --file ../docker-compose.yml build --parallel

echo "Run containers"
TMPDIR=../Temp/private$TMPDIR docker-compose --file ../docker-compose.yml up --detach

echo "----- docker-run.sh ----- END"
