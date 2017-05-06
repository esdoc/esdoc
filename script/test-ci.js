#!/usr/bin/env node
const sh = require('./sh');

sh.exec('./script/eslint.js');
sh.exec('./script/test.js --coverage');
sh.exec('./node_modules/.bin/codecov');
