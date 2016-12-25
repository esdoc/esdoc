#!/usr/bin/env node
const sh = require('./sh');

sh.rm('./out/site');
sh.mkdir('./out/site');
sh.exec('./node_modules/.bin/babel-node ./src/ESDocCLI.js -c ./site/esdoc-site.json');
