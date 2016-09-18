#!/usr/bin/env node
var sh = require('./sh');

sh.rm('./test/fixture/dest');
var mochaOption=" -t 10000 --require ./node_modules/babel-register --require ./test/src/init.js --recursive ./test/src -R spec";
sh.exec('./node_modules/.bin/mocha' + mochaOption);
