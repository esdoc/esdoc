#!/usr/bin/env node
const sh = require('./sh');

sh.exec('node ./script/build.js');
sh.rm('./test/fixture/dest');
const mochaOption = '-t 10000 --require ./out/test/src/init.js --recursive ./out/test/src -R spec';
sh.exec(`./node_modules/.bin/mocha ${mochaOption}`);
