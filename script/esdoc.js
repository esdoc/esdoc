#!/usr/bin/env node
var sh = require('./sh');

sh.rm('./doc/out/esdoc');
sh.mkdir('./doc/out/esdoc');
sh.exec('./node_modules/.bin/babel-node ./src/ESDocCLI.js -c esdoc.json');
