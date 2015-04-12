#!/bin/bash

rm -rf out/esdoc
mkdir -p out/esdoc
./out/src/index.js -c esdoc.json
