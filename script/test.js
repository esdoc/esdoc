#!/usr/bin/env node
var sh = require('./sh');

// judge node or io because run test with node and io on TRAVIS.
// send coverage report with only node.
var isNodeJS = process.version.indexOf('v0.12.') === 0;
var mochaOption=" -t 10000 --require ./node_modules/babel/register.js --recursive ./test/src -R spec";

if (process.env.TRAVIS && isNodeJS) {
  sh.exec('./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- ' + mochaOption + ' && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js');
} else if(process.argv.indexOf('--coverage') !== -1) {
  sh.exec('./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha  -- ' + mochaOption);
} else {
  sh.exec('./node_modules/.bin/mocha' + mochaOption);
}
