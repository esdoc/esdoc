#!/usr/bin/env node
var sh = require('./sh');

sh.exec('./node_modules/.bin/http-server ./ -p 8080 -c -1');
