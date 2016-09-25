#!/usr/bin/env node
const sh = require('./sh');

sh.exec('./node_modules/.bin/http-server ./ -p 8080 -c -1');
