#!/usr/bin/env node
var sh = require('./sh');

var mochaOption = " -t 10000 --recursive ./out/test/src -R spec";
var istanbulOption = ' cover --include-all-sources --root ./out/src/ -x "**/template/**" ./node_modules/mocha/bin/_mocha  -- ' + mochaOption;

sh.exec('node ./script/build.js');
sh.rm('./test/fixture/dest');

if (process.env.TRAVIS) {
  sh.exec('./node_modules/.bin/istanbul' + istanbulOption + ' && ./node_modules/.bin/codecov');
} else {
  sh.exec('./node_modules/.bin/istanbul' + istanbulOption);
}
