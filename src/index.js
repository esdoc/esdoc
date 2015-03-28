import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import esdoc from './esdoc.js';

let argv = minimist(process.argv.slice(2));
if (argv.h || argv.help) {
  console.log('usage: esdoc esdoc.json');
  return;
}

assert.equal(argv._.length, 1, 'specify esdoc.json');
let configFilePath = path.resolve(argv._[0]);
let configJSON = fs.readFileSync(configFilePath, {encode: 'utf8'});
let config = JSON.parse(configJSON);

esdoc(config, (data)=>{
  let taffy = require('taffydb').taffy;
  function publish(values) {
    let db = taffy(values);
    let results = [];
    db({kind: 'class'}).each((v)=>{
      results.push(v);
    });
    console.log(results);
  }
});

//import path from 'path';
//import fs from 'fs-extra';
//import estraverse from 'estraverse';
//import Logger from './Util/Logger.js';
//import ESParser from './Parser/ESParser';
//import PathResolver from './Util/PathResolver.js';
//import DocFactory from './Factory/DocFactory.js';
//
//Logger.debug = true;
//
//let inDirPath = './_temp/target';
//let filePath = './_temp/target/MyClass1.js';
//let packageName = 'foo-bar';
//let mainFilePath = './_temp/target/MyClass1.jsaaa';
//let pathPrefix = '';
//
//let ast = ESParser.parse(filePath);
//fs.writeFileSync('./_temp/ast.json', JSON.stringify(ast, null, 2), {encode: 'utf8'});
//
//let indent = [];
//let values = [];
//let pathResolver = new PathResolver(inDirPath, filePath, packageName, mainFilePath, pathPrefix);
//
//estraverse.traverse(ast, {
//  enter: function(node, parent) {
//    //Object.defineProperty(node, 'parent', {value: parent});
//    //if (node.leadingComments) {
//    //  console.log(JSON.stringify(node, null, 2));
//    let results = DocFactory.create(ast, node, parent, pathResolver);
//    values.push(...results);
//    //}
//    //console.log(indent.join('') + node.type);
//    //indent.push(' ');
//  },
//
//  leave: function() {
//    //indent.pop();
//  }
//});
//
//
//let taffy = require('taffydb').taffy;
//function publish(values) {
//  let db = taffy(values);
//  let results = [];
//  db({kind: 'class'}).each((v)=>{
//    results.push(v);
//  });
//  console.log(results);
//}
//
//publish(values);
//


