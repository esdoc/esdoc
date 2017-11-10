#!/usr/bin/env node
const path = require('path');
const sh = require('./sh');

const esdoc2 = path.resolve(__dirname, '..', 'src', 'ESDocCLI.js');
const babel = path.resolve(__dirname, '..', 'node_modules', '.bin', 'babel-node');
const arg = [].concat(process.argv).splice(2);
const cmd = [babel, esdoc2].concat(arg).join(' ');
sh.exec(cmd);
