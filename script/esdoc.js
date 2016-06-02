#!/usr/bin/env node
var sh = require('./sh');

sh.rm('./docs');
sh.mkdir('./docs');
sh.exec('./node_modules/.bin/babel-node ./src/ESDocCLI.js -c .esdocrc');
