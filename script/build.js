#!/usr/bin/env node
const sh = require('./sh');

sh.rm('./out/src');
sh.mkdir('./out/src');
sh.exec('./node_modules/.bin/babel --out-dir out/src src');
sh.chmod('./out/src/ESDocCLI.js', '755');
sh.cp('./src/Publisher/Builder/template/', './out/src/Publisher/Builder/template/');

// build test
sh.rm('./out/test/src');
sh.mkdir('./out/test/src');
sh.exec('./node_modules/.bin/babel --out-dir out/test/src test/src');
