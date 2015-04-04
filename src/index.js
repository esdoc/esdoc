import assert from 'assert';
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import esdoc from './esdoc.js';
import defaultPublisher from './Publisher/publish.js';

let argv = minimist(process.argv.slice(2));
if (argv.h || argv.help) {
  console.log('usage: esdoc [esdoc.json | path/to/js/src]');
  return;
}

assert.equal(argv._.length, 1, 'specify esdoc.json or dir. see -h');
assert(argv._[0], 'specify esdoc.json or dir. see -h');

let specifiedPath = path.resolve(argv._[0]);
let stat = fs.statSync(specifiedPath);
let config;

if (stat.isFile()) {
  // specified JSON file path.

  let configJSON = fs.readFileSync(specifiedPath, {encode: 'utf8'});
  config = JSON.parse(configJSON);

} else if(stat.isDirectory()) {
  // specified source directory path.

  let readmeStat = null;
  try {
    readmeStat = fs.statSync('./README.md');
  } catch(e) {
    // ignore
  }

  config = {
    source: specifiedPath,
    pattern: '\\.js$',
    destination: '_esdoc_',
    title: 'NO TITLE',
    description: 'NO DESCRIPTION',
    readme: readmeStat ? './README.md' : ''
  };

}

esdoc(config, defaultPublisher);

