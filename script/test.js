#!/usr/bin/env node
const sh = require('./sh');

sh.rm('./test.new/out');
const mochaOptions = [
  '-t 10000',
  '--require ./node_modules/babel-register',
  '--require ./test.new/init.js',
  // '--recursive ./test.new/src',
  '$(find test.new/src -regex \'.*.test.js$\')',
  '-R spec'
];
const mochaOption = mochaOptions.join(' ');
// const mochaOption = `-t 10000 --require ./node_modules/babel-register --require ./test.new/init.js --recursive ./test.new/src -R spec`;

if (process.argv.includes('--coverage')) {
  sh.exec(`NODE_ENV=coverage ./node_modules/.bin/nyc ./node_modules/mocha/bin/_mocha ${mochaOption}`);
} else {
  sh.exec(`./node_modules/.bin/mocha ${mochaOption}`);
}
