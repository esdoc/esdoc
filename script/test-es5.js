#!/usr/bin/env node
var sh = require('./sh');

var mochaOption = " -t 10000 --recursive ./out/test/src -R spec";
var istanbulOption = ' cover --include-all-sources --root ./out/src/ -x "template/*" ./node_modules/mocha/bin/_mocha  -- ' + mochaOption;

sh.exec('node ./script/build.js');

if (process.env.TRAVIS) {
  sh.exec('./node_modules/.bin/istanbul' + istanbulOption + ' && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js');
} else {
  sh.exec('./node_modules/.bin/istanbul' + istanbulOption);
}
