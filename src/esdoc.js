import babel from 'babel/polyfill';
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import Logger from 'color-logger';
import ASTUtil from './Util/ASTUtil.js';
import ESParser from './Parser/ESParser';
import PathResolver from './Util/PathResolver.js';
import DocFactory from './Factory/DocFactory.js';

export default class ESDoc {
  static generate(config, publisher) {
    assert(typeof publisher === 'function');
    assert(config.source);
    assert(config.destination);

    if (config.debug) {
      Logger.debug = config.debug;
    }

    let pattern = null;
    if (config.pattern) {
      pattern = RegExp(config.pattern);
    }

    let packageName = null;
    let mainFilePath = null;
    if (config.package) {
      let packegeJSON = fs.readFileSync(config.package, {encode: 'utf8'});
      let packageConfig = JSON.parse(packegeJSON);
      packageName = packageConfig.name;
      mainFilePath = packageConfig.main;
    }

    let pathPrefix = null;
    if (config.importPathPrefix) {
      pathPrefix = config.importPathPrefix;
    }

    let results = [];

    this._walk(config.source, (filePath)=>{
      if (pattern) {
        let matched = filePath.match(pattern);
        if (!matched) return;
      }

      let values = this._traverse(config.source, filePath, packageName, mainFilePath, pathPrefix);
      results.push(...values);
    });

    publisher(results, config);
  }

  static _walk(dirPath, callback) {
    let entries = fs.readdirSync(dirPath);

    for (let entry of entries) {
      let entryPath = path.resolve(dirPath, entry);
      let stat = fs.statSync(entryPath);

      if (stat.isFile()) {
        callback(entryPath);
      } else if (stat.isDirectory()) {
        walk(entryPath, callback);
      }
    }
  }

  static _traverse(inDirPath, filePath, packageName, mainFilePath, pathPrefix) {
    let ast = ESParser.parse(filePath);
    let pathResolver = new PathResolver(inDirPath, filePath, packageName, mainFilePath, pathPrefix);
    let factory = new DocFactory(ast, pathResolver);

    ASTUtil.traverse(ast, (node, parent)=>{
      factory.push(node, parent);
    });

    return factory.results;
  }
}

//export default function esdoc(config, publisher) {
//}

function walk(dirPath, callback) {
  let entries = fs.readdirSync(dirPath);

  for (let entry of entries) {
    let entryPath = path.resolve(dirPath, entry);
    let stat = fs.statSync(entryPath);

    if (stat.isFile()) {
      callback(entryPath);
    } else if (stat.isDirectory()) {
      walk(entryPath, callback);
    }
  }
}

function generate(inDirPath, filePath, packageName, mainFilePath, pathPrefix) {
  let ast = ESParser.parse(filePath);
  let pathResolver = new PathResolver(inDirPath, filePath, packageName, mainFilePath, pathPrefix);
  let factory = new DocFactory(ast, pathResolver);

  ASTUtil.traverse(ast, (node, parent)=>{
    factory.push(node, parent);
  });

  return factory.results;
}

