#!/usr/bin/env node
const sh = require('./sh');

sh.rm('./test/fixture/dest');
const mochaOption = '-t 10000 --require ./node_modules/babel-register --require ./test/src/init.js --recursive ./test/src -R spec';

if (process.argv.includes('--coverage')) {
  sh.exec(`NODE_ENV=coverage ./node_modules/.bin/nyc ./node_modules/mocha/bin/_mocha ${mochaOption}`);
} else {
  sh.exec(`./node_modules/.bin/mocha ${mochaOption}`);
}
