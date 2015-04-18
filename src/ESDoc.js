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

    this._setDefaultConfig(config);

    Logger.debug = !!config.debug;
    let pattern = new RegExp(config.pattern);
    let pathPrefix = config.importPathPrefix;

    let packageName = null;
    let mainFilePath = null;
    if (config.package) {
      try {
        let packageJSON = fs.readFileSync(config.package, {encode: 'utf8'});
        let packageConfig = JSON.parse(packageJSON);
        packageName = packageConfig.name;
        mainFilePath = packageConfig.main;
      } catch (e) {
        // ignore
      }
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

  static _setDefaultConfig(config) {
    if (!config.pattern) config.pattern = '\\.js$';

    if (!config.access) config.access = ['public', 'protected'];

    if (!('onlyExported' in config)) config.onlyExported = true;

    if (!config.readme) config.readme = './README.md';

    if (!config.package) config.package = './package.json';

    if (!config.importPathPrefix) config.importPathPrefix = '';

    if (!config.styles) config.styles = [];

    if (!config.scripts) config.scripts = [];
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

