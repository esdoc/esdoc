#!/usr/bin/env node
const sh = require('./sh');
const path = require('path');

sh.rm('./test.new/out');
const mochaOptions = [
  '$(find test/ -regex \'.*.test.js$\')',
];

const mochaOption = mochaOptions.join(' ');
const runMochaPath = path.resolve(__dirname, 'run-mocha.js');
if (process.argv.includes('--coverage')) {
  sh.exec(`NODE_ENV=coverage ./node_modules/.bin/nyc ${runMochaPath} ${mochaOption}`);
} else {
  sh.exec(`${runMochaPath} ${mochaOption}`);
}
