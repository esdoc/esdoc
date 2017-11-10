#!/usr/bin/env node
require('babel-core/register')({
  plugins: [
    'transform-es2015-modules-commonjs'
  ],
  env: {coverage: {plugins: ['istanbul']}}
});
const Mocha = require('mocha');
const init = require('../test/init').default;
const mocha = new Mocha();

init.then(() => {
  const tests = process.argv.slice(2);
  tests.forEach((test) => {
    mocha.addFile(test);
  });
  mocha.run((failures) => {
    process.on('exit', () => {
      process.exit(failures);  // exit with non-zero status if there were failures
    });
  });
});
