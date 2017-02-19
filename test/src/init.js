import fs from 'fs-extra';
import {taffy} from 'taffydb';
import ESDoc from '../../src/ESDoc.js';
import defaultPublisher from '../../src/Publisher/publish.js';

const configFilePath = './test/fixture/package/esdoc.json';
const configJSON = fs.readFileSync(configFilePath, {encode: 'utf8'});
const config = JSON.parse(configJSON);

ESDoc.generate(config, (data, asts, config)=>{
  const db = taffy(data);
  db.find = function(...cond) {
    return db(...cond).map(v => v);
  };

  global.db = db;

  defaultPublisher(data, asts, config);
});
