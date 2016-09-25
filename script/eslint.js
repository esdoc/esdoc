#!/usr/bin/env node
const sh = require('./sh');
sh.exec('./node_modules/.bin/eslint ./src ./test/src');
