#!/usr/bin/env node
const sh = require('./sh');

sh.cd('./doc/');
sh.exec('../node_modules/.bin/docpad generate');
