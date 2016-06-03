#!/usr/bin/env node
var sh = require('./sh');

sh.rm('./out/src');
sh.mkdir('./out/src');
sh.exec('./node_modules/.bin/babel src -d out/src');
sh.chmod('./out/src/ESDocCLI.js', '755');
sh.cp('./src/Publisher/Builder/template/', './out/src/Publisher/Builder/template/');