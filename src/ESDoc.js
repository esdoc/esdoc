import fs from 'fs';
import path from 'path';
import assert from 'assert';
import Logger from 'color-logger';
import ASTUtil from './Util/ASTUtil.js';
import ESParser from './Parser/ESParser';
import PathResolver from './Util/PathResolver.js';
import DocFactory from './Factory/DocFactory.js';
import TestDocFactory from './Factory/TestDocFactory.js';
import InvalidCodeLogger from './Util/InvalidCodeLogger.js';
import Plugin from './Plugin/Plugin.js';

const logger = new Logger('ESDoc');

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

    Plugin.init(config.plugins);
    Plugin.onStart();
    config = Plugin.onHandleConfig(config);

    this._setDefaultConfig(config);
    this._deprecatedConfig(config);

    Logger.debug = !!config.debug;
    const includes = config.includes.map((v) => new RegExp(v));
    const excludes = config.excludes.map((v) => new RegExp(v));

    let packageName = null;
    let mainFilePath = null;
    if (config.package) {
      try {
        const packageJSON = fs.readFileSync(config.package, {encode: 'utf8'});
        const packageConfig = JSON.parse(packageJSON);
        packageName = packageConfig.name;
        mainFilePath = packageConfig.main;
      } catch (e) {
        // ignore
      }
    }

    let results = [];
    const asts = [];
    const sourceDirPath = path.resolve(config.source);

    this._walk(config.source, (filePath)=>{
      const relativeFilePath = path.relative(sourceDirPath, filePath);
      let match = false;
      for (const reg of includes) {
        if (relativeFilePath.match(reg)) {
          match = true;
          break;
        }
      }
      if (!match) return;

      for (const reg of excludes) {
        if (relativeFilePath.match(reg)) return;
      }

      console.log(`parse: ${filePath}`);
      const temp = this._traverse(config, config.source, filePath, packageName, mainFilePath);
      if (!temp) return;
      results.push(...temp.results);

      asts.push({filePath: `source${path.sep}${relativeFilePath}`, ast: temp.ast});
    });

    if (config.test) {
      this._generateForTest(config, results, asts);
    }

    for (const tag of results) {
      if (tag.export === false) tag.ignore = true;
      if (tag.undocument === true) tag.ignore = true;
    }

    results = Plugin.onHandleTag(results);

    try {
      publisher(results, asts, config);
    } catch (e) {
      InvalidCodeLogger.showError(e);
      process.exit(1);
    }

    Plugin.onComplete();
  }

  /**
   * Generate document from test code.
   * @param {ESDocConfig} config - config for generating.
   * @param {DocObject[]} results - push DocObject to this.
   * @param {AST[]} asts - push ast to this.
   * @private
   */
  static _generateForTest(config, results, asts) {
    const includes = config.test.includes.map((v) => new RegExp(v));
    const excludes = config.test.excludes.map((v) => new RegExp(v));
    const sourceDirPath = path.resolve(config.test.source);

    this._walk(config.test.source, (filePath)=>{
      const relativeFilePath = path.relative(sourceDirPath, filePath);
      let match = false;
      for (const reg of includes) {
        if (relativeFilePath.match(reg)) {
          match = true;
          break;
        }
      }
      if (!match) return;

      for (const reg of excludes) {
        if (relativeFilePath.match(reg)) return;
      }

      console.log(`parse: ${filePath}`);
      const temp = this._traverseForTest(config, config.test.type, config.test.source, filePath);
      if (!temp) return;
      results.push(...temp.results);

      asts.push({filePath: `test${path.sep}${relativeFilePath}`, ast: temp.ast});
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

    if (!config.index) config.index = './README.md';

    if (!config.package) config.package = './package.json';

    if (config.test) {
      assert(config.test.type);
      assert(config.test.source);
      if (!config.test.includes) config.test.includes = ['(spec|Spec|test|Test)\\.(js|es6)$'];
      if (!config.test.excludes) config.test.excludes = ['\\.config\\.(js|es6)$'];
    }

    if (config.manual) {
      if (!('coverage' in config.manual)) config.manual.coverage = true;
    }
  }

  /* eslint-disable no-unused-vars */
  static _deprecatedConfig(config) {
    // do nothing
  }

  /**
   * walk recursive in directory.
   * @param {string} dirPath - target directory path.
   * @param {function(entryPath: string)} callback - callback for find file.
   * @private
   */
  static _walk(dirPath, callback) {
    const entries = fs.readdirSync(dirPath);

    for (const entry of entries) {
      const entryPath = path.resolve(dirPath, entry);
      const stat = fs.statSync(entryPath);

      if (stat.isFile()) {
        callback(entryPath);
      } else if (stat.isDirectory()) {
        this._walk(entryPath, callback);
      }
    }
  }

  /**
   * traverse doc comment in JavaScript file.
   * @param {ESDocConfig} config - config of esdoc.
   * @param {string} inDirPath - root directory path.
   * @param {string} filePath - target JavaScript file path.
   * @param {string} [packageName] - npm package name of target.
   * @param {string} [mainFilePath] - npm main file path of target.
   * @returns {Object} - return document that is traversed.
   * @property {DocObject[]} results - this is contained JavaScript file.
   * @property {AST} ast - this is AST of JavaScript file.
   * @private
   */
  static _traverse(config, inDirPath, filePath, packageName, mainFilePath) {
    logger.i(`parsing: ${filePath}`);
    let ast;
    try {
      ast = ESParser.parse(config, filePath);
    } catch (e) {
      InvalidCodeLogger.showFile(filePath, e);
      return null;
    }

    const pathResolver = new PathResolver(inDirPath, filePath, packageName, mainFilePath);
    const factory = new DocFactory(ast, pathResolver);

    ASTUtil.traverse(ast, (node, parent)=>{
      try {
        factory.push(node, parent);
      } catch (e) {
        InvalidCodeLogger.show(filePath, node);
        throw e;
      }
    });

    return {results: factory.results, ast: ast};
  }

  /**
   * traverse doc comment in test code file.
   * @param {ESDocConfig} config - config of esdoc.
   * @param {string} type - test code type.
   * @param {string} inDirPath - root directory path.
   * @param {string} filePath - target test code file path.
   * @returns {Object} return document info that is traversed.
   * @property {DocObject[]} results - this is contained test code.
   * @property {AST} ast - this is AST of test code.
   * @private
   */
  static _traverseForTest(config, type, inDirPath, filePath) {
    let ast;
    try {
      ast = ESParser.parse(config, filePath);
    } catch (e) {
      InvalidCodeLogger.showFile(filePath, e);
      return null;
    }
    const pathResolver = new PathResolver(inDirPath, filePath);
    const factory = new TestDocFactory(type, ast, pathResolver);

    ASTUtil.traverse(ast, (node, parent)=>{
      try {
        factory.push(node, parent);
      } catch (e) {
        InvalidCodeLogger.show(filePath, node);
        throw e;
      }
    });

    return {results: factory.results, ast: ast};
  }
}
