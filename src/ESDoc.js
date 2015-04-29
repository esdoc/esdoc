import babel from 'babel/polyfill';
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import Logger from 'color-logger';
import ASTUtil from './Util/ASTUtil.js';
import ESParser from './Parser/ESParser';
import PathResolver from './Util/PathResolver.js';
import DocFactory from './Factory/DocFactory.js';

/**
 * API Documentation Generator.
 *
 * @example
 * let config = {source: './src', destination: './esdoc'};
 * ESDoc.generate(config, (results, config)=>{
 *   console.log(results);
 * });
 */
export default class ESDoc {
  /**
   * Generate documentation.
   * @param {ESDocConfig} config - config for generation.
   * @param {function(results: Object, asts: Object[], config: ESDocConfig)} publisher - callback for output html.
   */
  static generate(config, publisher) {
    assert(typeof publisher === 'function');
    assert(config.source);
    assert(config.destination);

    this._setDefaultConfig(config);

    Logger.debug = !!config.debug;
    let includes = config.includes.map((v) => new RegExp(v));
    let excludes = config.excludes.map((v) => new RegExp(v));
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
    let asts = [];

    this._walk(config.source, (filePath)=>{
      let match = false;
      for (let reg of includes) {
        if (filePath.match(reg)) {
          match = true;
          break;
        }
      }
      if (!match) return;

      for (let reg of excludes) {
        if (filePath.match(reg)) return;
      }

      let temp = this._traverse(config.source, filePath, packageName, mainFilePath, pathPrefix);
      results.push(...temp.results);

      let relativeFilePath = path.relative(path.dirname(config.source), filePath);
      asts.push({filePath: relativeFilePath, ast: temp.ast});
    });

    if (config.defaultExternal) {
      this._useDefaultExternal(results);
    }

    publisher(results, asts, config);
  }

  /**
   * set default config to specified config.
   * @param {ESDocConfig} config - specified config.
   * @private
   */
  static _setDefaultConfig(config) {
    if (!config.includes) config.includes = ['\\.js$'];

    if (!config.excludes) config.excludes = ['\\.config\\.js$'];

    if (!config.access) config.access = ['public', 'protected'];

    if (!('autoPrivate' in config)) config.autoPrivate = true;

    if (!('onlyExported' in config)) config.onlyExported = true;

    if (!('defaultExternal' in config)) config.defaultExternal = true;

    if (!('undocumentSymbol' in config)) config.undocumentSymbol = true;

    if (!config.readme) config.readme = './README.md';

    if (!config.package) config.package = './package.json';

    if (!config.importPathPrefix) config.importPathPrefix = '';

    if (!config.styles) config.styles = [];

    if (!config.scripts) config.scripts = [];
  }

  static _useDefaultExternal(results) {
    let dirPath = path.resolve(__dirname, './DefaultExternal/');
    this._walk(dirPath, (filePath)=>{
      let temp = this._traverse(dirPath, filePath);
      temp.results.forEach((v)=> v.defaultExternal = true);
      let res = temp.results.filter(v => v.kind === 'external');
      results.push(...res);
    });
  }

  /**
   * walk recursive in directory.
   * @param {string} dirPath - target directory path.
   * @param {function(entryPath: string)} callback - callback for find file.
   * @private
   */
  static _walk(dirPath, callback) {
    let entries = fs.readdirSync(dirPath);

    for (let entry of entries) {
      let entryPath = path.resolve(dirPath, entry);
      let stat = fs.statSync(entryPath);

      if (stat.isFile()) {
        callback(entryPath);
      } else if (stat.isDirectory()) {
        this._walk(entryPath, callback);
      }
    }
  }

  /**
   * traverse doc comment in JavaScript file.
   * @param {string} inDirPath - root directory path.
   * @param {string} filePath - target JavaScript file path.
   * @param {string} [packageName] - npm package name of target.
   * @param {string} [mainFilePath] - npm main file path of target.
   * @param {string} [pathPrefix] - prefix of import path from root directory.
   * @returns {Object}
   * @property {DocObject[]} results
   * @property {Object} ast
   * @private
   */
  static _traverse(inDirPath, filePath, packageName, mainFilePath, pathPrefix) {
    let ast = ESParser.parse(filePath);
    let pathResolver = new PathResolver(inDirPath, filePath, packageName, mainFilePath, pathPrefix);
    let factory = new DocFactory(ast, pathResolver);

    ASTUtil.traverse(ast, (node, parent)=>{
      factory.push(node, parent);
    });

    return {results: factory.results, ast: ast};
  }
}
