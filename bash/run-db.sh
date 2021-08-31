#!/usr/bin/env bash

echo off > /dev/null
echo "----- run-db.sh ----- BEGIN"

echo "Starting DB"
docker-compose -f ../docker-compose.yml up --detach db

echo "Sleeping for 15 seconds to allow DB to initialize"
sleep 15

echo "DB running!"

echo "----- run-db.sh ----- END"
