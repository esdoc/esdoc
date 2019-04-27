"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _assert = _interopRequireDefault(require("assert"));

var _colorLogger = _interopRequireDefault(require("color-logger"));

var _ASTUtil = _interopRequireDefault(require("./Util/ASTUtil.js"));

var _ESParser = _interopRequireDefault(require("./Parser/ESParser"));

var _PathResolver = _interopRequireDefault(require("./Util/PathResolver.js"));

var _DocFactory = _interopRequireDefault(require("./Factory/DocFactory.js"));

var _InvalidCodeLogger = _interopRequireDefault(require("./Util/InvalidCodeLogger.js"));

var _Plugin = _interopRequireDefault(require("./Plugin/Plugin.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * API Documentation Generator.
 *
 * @example
 * let config = {source: './src', destination: './esdoc'};
 * ESDoc.generate(config, (results, config)=>{
 *   console.log(results);
 * });
 */
class ESDoc {
  /**
   * Generate documentation.
   * @param {ESDocConfig} config - config for generation.
   */
  static generate(config) {
    (0, _assert.default)(config.source);
    (0, _assert.default)(config.destination);

    this._checkOldConfig(config);

    _Plugin.default.init(config.plugins);

    _Plugin.default.onStart();

    config = _Plugin.default.onHandleConfig(config);

    this._setDefaultConfig(config);

    _colorLogger.default.debug = !!config.debug;
    const includes = config.includes.map(v => new RegExp(v));
    const excludes = config.excludes.map(v => new RegExp(v));
    let packageName = null;
    let mainFilePath = null;

    if (config.package) {
      try {
        const packageJSON = _fsExtra.default.readFileSync(config.package, {
          encode: 'utf8'
        });

        const packageConfig = JSON.parse(packageJSON);
        packageName = packageConfig.name;
        mainFilePath = packageConfig.main;
      } catch (e) {// ignore
      }
    }

    let results = [];
    const asts = [];

    const sourceDirPath = _path.default.resolve(config.source);

    this._walk(config.source, filePath => {
      const relativeFilePath = _path.default.relative(sourceDirPath, filePath);

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

      if (config.outputAST) {
        asts.push({
          filePath: `source${_path.default.sep}${relativeFilePath}`,
          ast: temp.ast
        });
      }
    }); // config.index


    if (config.index) {
      results.push(this._generateForIndex(config));
    } // config.package


    if (config.package) {
      results.push(this._generateForPackageJSON(config));
    }

    results = this._resolveDuplication(results);
    results = _Plugin.default.onHandleDocs(results); // index.json

    {
      const dumpPath = _path.default.resolve(config.destination, 'index.json');

      _fsExtra.default.outputFileSync(dumpPath, JSON.stringify(results, null, 2));
    } // ast, array will be empty if config.outputAST is false - resulting in skipping the loop

    for (const ast of asts) {
      const json = JSON.stringify(ast.ast, null, 2);

      const filePath = _path.default.resolve(config.destination, `ast/${ast.filePath}.json`);

      _fsExtra.default.outputFileSync(filePath, json);
    } // publish


    this._publish(config);

    _Plugin.default.onComplete();
  }
  /**
   * check ESDoc config. and if it is old, exit with warning message.
   * @param {ESDocConfig} config - check config
   * @private
   */


  static _checkOldConfig(config) {
    let exit = false;
    const keys = [['access', 'esdoc-standard-plugin'], ['autoPrivate', 'esdoc-standard-plugin'], ['unexportedIdentifier', 'esdoc-standard-plugin'], ['undocumentIdentifier', 'esdoc-standard-plugin'], ['builtinExternal', 'esdoc-standard-plugin'], ['coverage', 'esdoc-standard-plugin'], ['test', 'esdoc-standard-plugin'], ['title', 'esdoc-standard-plugin'], ['manual', 'esdoc-standard-plugin'], ['lint', 'esdoc-standard-plugin'], ['includeSource', 'esdoc-exclude-source-plugin'], ['styles', 'esdoc-inject-style-plugin'], ['scripts', 'esdoc-inject-script-plugin'], ['experimentalProposal', 'esdoc-ecmascript-proposal-plugin']];

    for (const [key, plugin] of keys) {
      if (key in config) {
        console.log(`[31merror: config.${key} is invalid. Please use ${plugin}. how to migration: https://esdoc.org/manual/migration.html[0m`);
        exit = true;
      }
    }

    if (exit) process.exit(1);
  }
  /**
   * set default config to specified config.
   * @param {ESDocConfig} config - specified config.
   * @private
   */


  static _setDefaultConfig(config) {
    if (!config.includes) config.includes = ['\\.js$'];
    if (!config.excludes) config.excludes = ['\\.config\\.js$', '\\.test\\.js$'];
    if (!config.index) config.index = './README.md';
    if (!config.package) config.package = './package.json';
    if (!('outputAST' in config)) config.outputAST = true;
  }
  /**
   * walk recursive in directory.
   * @param {string} dirPath - target directory path.
   * @param {function(entryPath: string)} callback - callback for find file.
   * @private
   */


  static _walk(dirPath, callback) {
    const entries = _fsExtra.default.readdirSync(dirPath);

    for (const entry of entries) {
      const entryPath = _path.default.resolve(dirPath, entry);

      const stat = _fsExtra.default.statSync(entryPath);

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
    _colorLogger.default.i(`parsing: ${filePath}`);

    let ast;

    try {
      ast = _ESParser.default.parse(filePath);
    } catch (e) {
      _InvalidCodeLogger.default.showFile(filePath, e);

      return null;
    }

    const pathResolver = new _PathResolver.default(inDirPath, filePath, packageName, mainFilePath);
    const factory = new _DocFactory.default(ast, pathResolver);

    _ASTUtil.default.traverse(ast, (node, parent) => {
      try {
        factory.push(node, parent);
      } catch (e) {
        _InvalidCodeLogger.default.show(filePath, node);

        throw e;
      }
    });

    return {
      results: factory.results,
      ast: ast
    };
  }
  /**
   * generate index doc
   * @param {ESDocConfig} config
   * @returns {Tag}
   * @private
   */


  static _generateForIndex(config) {
    let indexContent = '';

    if (_fsExtra.default.existsSync(config.index)) {
      indexContent = _fsExtra.default.readFileSync(config.index, {
        encode: 'utf8'
      }).toString();
    } else {
      console.log(`[31mwarning: ${config.index} is not found. Please check config.index.[0m`);
    }

    const tag = {
      kind: 'index',
      content: indexContent,
      longname: _path.default.resolve(config.index),
      name: config.index,
      static: true,
      access: 'public'
    };
    return tag;
  }
  /**
   * generate package doc
   * @param {ESDocConfig} config
   * @returns {Tag}
   * @private
   */


  static _generateForPackageJSON(config) {
    let packageJSON = '';
    let packagePath = '';

    try {
      packageJSON = _fsExtra.default.readFileSync(config.package, {
        encoding: 'utf-8'
      });
      packagePath = _path.default.resolve(config.package);
    } catch (e) {// ignore
    }

    const tag = {
      kind: 'packageJSON',
      content: packageJSON,
      longname: packagePath,
      name: _path.default.basename(packagePath),
      static: true,
      access: 'public'
    };
    return tag;
  }
  /**
   * resolve duplication docs
   * @param {Tag[]} docs
   * @returns {Tag[]}
   * @private
   */


  static _resolveDuplication(docs) {
    const memberDocs = docs.filter(doc => doc.kind === 'member');
    const removeIds = [];

    for (const memberDoc of memberDocs) {
      // member duplicate with getter/setter/method.
      // when it, remove member.
      // getter/setter/method are high priority.
      const sameLongnameDoc = docs.find(doc => doc.longname === memberDoc.longname && doc.kind !== 'member');

      if (sameLongnameDoc) {
        removeIds.push(memberDoc.__docId__);
        continue;
      }

      const dup = docs.filter(doc => doc.longname === memberDoc.longname && doc.kind === 'member');

      if (dup.length > 1) {
        const ids = dup.map(v => v.__docId__);
        ids.sort((a, b) => {
          return a < b ? -1 : 1;
        });
        ids.shift();
        removeIds.push(...ids);
      }
    }

    return docs.filter(doc => !removeIds.includes(doc.__docId__));
  }
  /**
   * publish content
   * @param {ESDocConfig} config
   * @private
   */


  static _publish(config) {
    try {
      const write = (filePath, content, option) => {
        const _filePath = _path.default.resolve(config.destination, filePath);

        content = _Plugin.default.onHandleContent(content, _filePath);
        console.log(`output: ${_filePath}`);

        _fsExtra.default.outputFileSync(_filePath, content, option);
      };

      const copy = (srcPath, destPath) => {
        const _destPath = _path.default.resolve(config.destination, destPath);

        console.log(`output: ${_destPath}`);

        _fsExtra.default.copySync(srcPath, _destPath);
      };

      const read = filePath => {
        const _filePath = _path.default.resolve(config.destination, filePath);

        return _fsExtra.default.readFileSync(_filePath).toString();
      };

      _Plugin.default.onPublish(write, copy, read);
    } catch (e) {
      _InvalidCodeLogger.default.showError(e);

      process.exit(1);
    }
  }

}

exports.default = ESDoc;