#!/usr/bin/env node
var sh = require('./sh');
sh.exec('./node_modules/.bin/eslint ./src ./test/src');
