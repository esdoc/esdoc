#!/usr/bin/env node
const sh = require('./sh');

const sourceMap = '--source-map=out/esdoc/css/style.css.map';
const source = 'src/Publisher/Builder/template/less/style.less';
const destination = 'out/esdoc/css/style.css';

sh.exec(`./node_modules/.bin/lessc ${sourceMap} ${source} ${destination}`);
