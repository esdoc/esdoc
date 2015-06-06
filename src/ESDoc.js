import es6shim from 'core-js/shim';
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import Logger from 'color-logger';
import ASTUtil from './Util/ASTUtil.js';
import ESParser from './Parser/ESParser';
import PathResolver from './Util/PathResolver.js';
import DocFactory from './Factory/DocFactory.js';
import TestDocFactory from './Factory/TestDocFactory.js';

let logger = new Logger('ESDoc');

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
   * @param {function(results: Object[], asts: Object[], config: ESDocConfig)} publisher - callback for output html.
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
      if (!temp) return;
      results.push(...temp.results);

      let relativeFilePath = path.relative(path.dirname(config.source), filePath);
      asts.push({filePath: 'source' + path.sep + relativeFilePath, ast: temp.ast});
    });

    if (config.builtinExternal) {
      this._useBuiltinExternal(results);
    }

    if (config.test) {
      this._generateForTest(config, results, asts);
    }

    publisher(results, asts, config);
  }

  /**
   * Generate document from test code.
   * @param {ESDocConfig} config - config for generating.
   * @param {DocObject[]} results - push DocObject to this.
   * @param {AST[]} asts - push ast to this.
   * @private
   */
  static _generateForTest(config, results, asts) {
    let includes = config.test.includes.map((v) => new RegExp(v));
    let excludes = config.test.excludes.map((v) => new RegExp(v));

    this._walk(config.test.source, (filePath)=>{
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

      let temp = this._traverseForTest(config.test.type, config.test.source, filePath);
      if (!temp) return;
      results.push(...temp.results);

      let relativeFilePath = path.relative(path.dirname(config.test.source), filePath);
      asts.push({filePath: 'test' + path.sep + relativeFilePath, ast: temp.ast});
    });
  }

  /**
   * set default config to specified config.
   * @param {ESDocConfig} config - specified config.
   * @private
   */
  static _setDefaultConfig(config) {
    if (!config.includes) config.includes = ['\\.(js|es6)$'];

    if (!config.excludes) config.excludes = ['\\.config\\.(js|es6)$'];

    if (!config.access) config.access = ['public', 'protected'];

    if (!('autoPrivate' in config)) config.autoPrivate = true;

    if (!('unexportIdentifier' in config)) config.unexportIdentifier = false;

    if (!('builtinExternal' in config)) config.builtinExternal = true;

    if (!('undocumentIdentifier' in config)) config.undocumentIdentifier = true;

    if (!('coverage' in config)) config.coverage = true;

    if (!config.index) config.index = './README.md';

    if (!config.package) config.package = './package.json';

    if (!config.importPathPrefix) config.importPathPrefix = '';

    if (!config.styles) config.styles = [];

    if (!config.scripts) config.scripts = [];

    if (config.test) {
      assert(config.test.type);
      assert(config.test.source);
      if (!config.test.includes) config.test.includes = ['(spec|Spec|test|Test)\\.(js|es6)$'];
      if (!config.test.excludes) config.test.excludes = ['\\.config\\.(js|es6)$'];
    }
  }

  /**
   * Use built-in external document.
   * built-in external has number, string, boolean, etc...
   * @param {DocObject[]} results - this method pushes DocObject to this param.
   * @private
   * @see {@link src/BuiltinExternal/ECMAScriptExternal.js}
   */
  static _useBuiltinExternal(results) {
    let dirPath = path.resolve(__dirname, './BuiltinExternal/');
    this._walk(dirPath, (filePath)=>{
      let temp = this._traverse(dirPath, filePath);
      temp.results.forEach((v)=> v.builtinExternal = true);
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
   * @returns {Object} - return document that is traversed.
   * @property {DocObject[]} results - this is contained JavaScript file.
   * @property {AST} ast - this is AST of JavaScript file.
   * @private
   */
  static _traverse(inDirPath, filePath, packageName, mainFilePath, pathPrefix) {
    let ast;
    try {
      ast = ESParser.parse(filePath);
    } catch(e) {
      logger.w(`fail parse: ${filePath}`);
      return null;
    }

    let pathResolver = new PathResolver(inDirPath, filePath, packageName, mainFilePath, pathPrefix);
    let factory = new DocFactory(ast, pathResolver);

    ASTUtil.traverse(ast, (node, parent)=>{
      factory.push(node, parent);
    });

    return {results: factory.results, ast: ast};
  }

  /**
   * traverse doc comment in test code file.
   * @param {string} type - test code type.
   * @param {string} inDirPath - root directory path.
   * @param {string} filePath - target test code file path.
   * @returns {Object} return document info that is traversed.
   * @property {DocObject[]} results - this is contained test code.
   * @property {AST} ast - this is AST of test code.
   * @private
   */
  static _traverseForTest(type, inDirPath, filePath) {
    let ast;
    try {
      ast = ESParser.parse(filePath);
    } catch(e) {
      logger.w(`fail parse: ${filePath}`);
      return null;
    }
    let pathResolver = new PathResolver(inDirPath, filePath);
    let factory = new TestDocFactory(type, ast, pathResolver);

    ASTUtil.traverse(ast, (node, parent)=>{
      factory.push(node, parent);
    });

    return {results: factory.results, ast: ast};
  }
}
