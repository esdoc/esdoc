#!/usr/bin/env node
const sh = require('./sh');

sh.rm('./out/src');
sh.mkdir('./out/src');
sh.exec('./node_modules/.bin/babel --out-dir out/src src');
sh.chmod('./out/src/ESDocCLI.js', '755');
