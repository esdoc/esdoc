import fs from 'fs-extra';
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
   */
  static generate(config) {
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
      const temp = this._traverse(config.source, filePath, packageName, mainFilePath);
      if (!temp) return;
      results.push(...temp.results);

      asts.push({filePath: `source${path.sep}${relativeFilePath}`, ast: temp.ast});
    });

    if (config.test) {
      this._generateForTest(config, results, asts);
    }

    // ignore unexported and undocumented
    for (const tag of results) {
      if (tag.export === false) tag.ignore = true;
      if (tag.undocument === true) tag.ignore = true;
    }

    // config.index
    if (config.index) {
      results.push(this._generateForIndex(config));
    }

    // manual
    if (config.manual) {
      results.push(...this._generateForManual(config));
    }

    results = Plugin.onHandleDocs(results);

    // cleanup
    fs.removeSync(config.destination);

    // index.json
    {
      const dumpPath = path.resolve(config.destination, 'index.json');
      fs.outputFileSync(dumpPath, JSON.stringify(results, null, 2));
    }

    // ast
    for (const ast of asts) {
      const json = JSON.stringify(ast.ast, null, 2);
      const filePath = path.resolve(config.destination, `ast/${ast.filePath}.json`);
      fs.outputFileSync(filePath, json);
    }

    // package.json
    try {
      const json = fs.readFileSync(config.package, {encoding: 'utf-8'});
      const filePath = path.resolve(config.destination, 'package.json');
      fs.outputFileSync(filePath, json, {encoding: 'utf8'});
    } catch (e) {
      // ignore
    }

    // publish
    this._publish(config);

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
      const temp = this._traverseForTest(config.test.type, config.test.source, filePath);
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
   * @param {string} inDirPath - root directory path.
   * @param {string} filePath - target JavaScript file path.
   * @param {string} [packageName] - npm package name of target.
   * @param {string} [mainFilePath] - npm main file path of target.
   * @returns {Object} - return document that is traversed.
   * @property {DocObject[]} results - this is contained JavaScript file.
   * @property {AST} ast - this is AST of JavaScript file.
   * @private
   */
  static _traverse(inDirPath, filePath, packageName, mainFilePath) {
    logger.i(`parsing: ${filePath}`);
    let ast;
    try {
      ast = ESParser.parse(filePath);
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

  static _generateForIndex(config) {
    const indexContent = fs.readFileSync(config.index, {encode: 'utf8'}).toString();
    const tag = {
      kind: 'index',
      content: indexContent,
      longname: path.resolve(config.index),
      name: config.index,
      static: true,
      access: 'public'
    };

    return tag;
  }

  static _generateForManual(config) {
    const results = [];

    if (!config.manual) return results;

    if (config.manual.index) {
      results.push({
        kind: 'manualIndex',
        globalIndex: config.manual.globalIndex,
        coverage: config.manual.coverage,
        content: fs.readFileSync(config.manual.index).toString(),
        longname: path.resolve(config.manual.index),
        name: config.manual.index,
        static: true,
        access: 'public'
      });
    } else {
      results.push({
        kind: 'manualIndex',
        globalIndex: false,
        coverage: config.manual.coverage,
        content: null,
        longname: '', // longname does not must be null.
        name: config.manual.index,
        static: true,
        access: 'public'
      });
    }

    if (config.manual.asset) {
      results.push({
        kind: 'manualAsset',
        longname: path.resolve(config.manual.asset),
        name: config.manual.asset,
        static: true,
        access: 'public'
      });
    }

    const names = ['overview', 'design', 'installation', 'usage', 'tutorial', 'configuration', 'example', 'advanced', 'faq', 'changelog'];
    for (const name of names) {
      if (!config.manual[name]) continue;

      const kind = `manual${name.replace(/^./, c => c.toUpperCase())}`;
      for (const filePath of config.manual[name]) {
        results.push({
          kind: kind,
          longname: path.resolve(filePath),
          name: filePath,
          content: fs.readFileSync(filePath).toString(),
          static: true,
          access: 'public'
        });
      }
    }

    return results;
  }

  static _publish(config) {
    try {
      const write = (filePath, content, option) =>{
        const _filePath = path.resolve(config.destination, filePath);
        content = Plugin.onHandleContent(content, _filePath);

        console.log(`output: ${_filePath}`);
        fs.outputFileSync(_filePath, content, option);
      };

      const copy = (srcPath, destPath) => {
        const _destPath = path.resolve(config.destination, destPath);
        console.log(`output: ${_destPath}`);
        fs.copySync(srcPath, _destPath);
      };

      const read = (filePath) => {
        const _filePath = path.resolve(config.destination, filePath);
        return fs.readFileSync(_filePath).toString();
      };

      Plugin.onPublish(write, copy, read);
    } catch (e) {
      InvalidCodeLogger.showError(e);
      process.exit(1);
    }
  }
}
