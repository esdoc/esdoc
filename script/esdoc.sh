#!/bin/bash

rm -rf ./doc/out/esdoc
mkdir -p ./doc/out/esdoc
./node_modules/.bin/babel-node ./src/ESDocCLI.js -c esdoc.json
