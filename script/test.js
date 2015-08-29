#!/usr/bin/env node
var sh = require('./sh');

var mochaOption=" -t 10000 --require ./node_modules/babel/register.js --recursive ./test/src -R spec";
sh.exec('./node_modules/.bin/mocha' + mochaOption);
