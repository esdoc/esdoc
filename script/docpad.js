#!/usr/bin/env node
var sh = require('./sh');

sh.cd('./doc/');
sh.exec('../node_modules/.bin/docpad generate');
