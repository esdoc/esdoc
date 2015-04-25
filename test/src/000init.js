import fs from 'fs-extra';
import {taffy} from 'taffydb';
import ESDoc from '../../src/ESDoc.js';
import defaultPublisher from '../../src/Publisher/publish.js';

let configFilePath = './test/fixture/esdoc.json';
let configJSON = fs.readFileSync(configFilePath, {encode: 'utf8'});
let config = JSON.parse(configJSON);

ESDoc.generate(config, (data, asts, config)=>{
  fs.removeSync(config.destination);

  let db = taffy(data);
  db.find = function(...cond) {
    return db(...cond).map(v => v);
  };

  global.db = db;

  defaultPublisher(data, asts, config);
});
