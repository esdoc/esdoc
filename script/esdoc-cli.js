#!/usr/bin/env node
var path = require('path');
var sh = require('./sh');

var esdoc = path.resolve(__dirname, '..', 'src', 'ESDocCLI.js');
var babel = path.resolve(__dirname, '..', 'node_modules', '.bin', 'babel-node');
var arg = [].concat(process.argv).splice(2);
var cmd = [babel, esdoc].concat(arg).join(' ');
sh.exec(cmd);
