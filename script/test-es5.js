#!/usr/bin/env node
var sh = require('./sh');

var mochaOption = " -t 10000 --recursive ./out/test/src";
var istanbulOption = " cover ./node_modules/mocha/bin/_mocha --include-all-sources --root out/src -x '**/template/**' -- " + mochaOption;

sh.exec('node ./script/build.js');

if (process.env.TRAVIS) {
  sh.exec('./node_modules/.bin/istanbul' + istanbulOption + ' && ./node_modules/.bin/codecov');
} else {
  sh.exec('./node_modules/.bin/istanbul' + istanbulOption);
}
