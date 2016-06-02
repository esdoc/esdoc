#!/usr/bin/env node
var sh = require('./sh');

var mochaOption = " --compilers js:babel-register -t 10000 --recursive ./test/src";
var istanbulOption = " cover ./node_modules/mocha/bin/_mocha --include-all-sources --root src -x '**/template/**' -- " + mochaOption;

if (process.env.TRAVIS) {
  sh.exec('./node_modules/.bin/istanbul' + istanbulOption + ' && ./node_modules/.bin/codecov');
} else {
  sh.exec('./node_modules/.bin/istanbul' + istanbulOption);
}
