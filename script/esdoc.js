#!/usr/bin/env node
const sh = require('./sh');

sh.rm('./out/docs');
sh.mkdir('./out/docs');

sh.rm('./node_modules/esdoc2');
sh.mkdir('./node_modules/esdoc2/out/src');
sh.cp('./out/src', './node_modules/esdoc2/out/src/');
sh.cp('./package.json', './node_modules/esdoc2/package.json');
sh.exec('node ./node_modules/esdoc2/out/src/ESDocCLI.js');
