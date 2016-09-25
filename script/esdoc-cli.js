#!/usr/bin/env node
const path = require('path');
const sh = require('./sh');

const esdoc = path.resolve(__dirname, '..', 'src', 'ESDocCLI.js');
const babel = path.resolve(__dirname, '..', 'node_modules', '.bin', 'babel-node');
const arg = [].concat(process.argv).splice(2);
const cmd = [babel, esdoc].concat(arg).join(' ');
sh.exec(cmd);
