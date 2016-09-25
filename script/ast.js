#!/usr/bin/env node
require('babel-register');
const ESParser = require('../src/Parser/ESParser.js').default;
const Plugin = require('../src/Plugin/Plugin.js').default;

Plugin.init([]);

if (!process.argv[2]) {
  console.log('usage: ast.js path/to/file');
  process.exit(1);
}

const ast = ESParser.parse({}, process.argv[2]);
console.log(JSON.stringify(ast, null, 2));
