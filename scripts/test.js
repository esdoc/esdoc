#!/usr/bin/env node
const sh = require('./sh');
const path = require('path');

sh.rm('./test.new/out');
const mochaOptions = [
  '$(find test/ -regex \'.*.test.js$\')',
];

const mochaOption = mochaOptions.join(' ');
const runMochaPath = path.resolve(__dirname, 'run-mocha.js');
if (process.env.NODE_ENV === 'coverage') {
  sh.exec(`nyc ${runMochaPath} ${mochaOption}`);
} else {
  sh.exec(`${runMochaPath} ${mochaOption}`);
}
