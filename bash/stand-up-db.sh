#!/usr/bin/env bash

echo off > /dev/null
echo "----- stand-up-db.sh ----- BEGIN"

./build-db.sh

echo "Removing DB data files"
rm -rf ../Temp

./run-db.sh
./run-migrations.sh

echo "DB ready to use!"

echo "----- stand-up-db.sh ----- END"
