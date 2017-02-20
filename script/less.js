#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sh = require('./sh');

// Get esdoc configuration
const configFile = fs.readFileSync('.esdoc.json', 'utf8');
const configData = JSON.parse(configFile);

// Set `style.less` source path
const source = 'src/Publisher/Builder/template/less/style.less';

// Set `style.css` destination path (out/esdoc/css/style.css)
const styleCss = path.resolve(configData.destination, './css/style.css');
const destination = path.relative('./', styleCss);

// Set Less compiler options
const sourceMap = `--source-map=${destination}.map --source-map-less-inline`;

// Compile less to css
sh.exec(`./node_modules/.bin/lessc ${sourceMap} ${source} ${destination}`);

console.log(
`Less input file:
    - ${source}

Less output files:
    - ${destination}
    - ${destination}.map
`);
