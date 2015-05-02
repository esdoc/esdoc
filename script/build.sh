#!/bin/bash

# build src
rm -rf out/src
mkdir -p out/src
./node_modules/.bin/babel --out-dir out/src src
chmod +x out/src/ESDocCLI.js
cp -af ./src/Publisher/Builder/template ./out/src/Publisher/Builder/

# build test
rm -rf out/test/src
mkdir -p out/test/src
./node_modules/.bin/babel --out-dir out/test/src test/src
