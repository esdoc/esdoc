#!/usr/bin/env node
const sh = require('./sh');

sh.rm('./out/esdoc');
sh.mkdir('./out/esdoc');
sh.exec('./node_modules/.bin/babel-node ./src/ESDocCLI.js');
