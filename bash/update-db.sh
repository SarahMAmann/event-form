#!/usr/bin/env bash

echo off > /dev/null
echo "----- update-db.sh ----- BEGIN"

./build-db.sh
./run-db.sh
./run-migrations.sh

echo "Migrations complete!"

echo "----- update-db.sh ----- END"
