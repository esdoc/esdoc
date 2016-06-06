'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _colorLogger = require('color-logger');

var _colorLogger2 = _interopRequireDefault(_colorLogger);

var _ASTUtil = require('./Util/ASTUtil.js');

var _ASTUtil2 = _interopRequireDefault(_ASTUtil);

var _ESParser = require('./Parser/ESParser');

var _ESParser2 = _interopRequireDefault(_ESParser);

var _PathResolver = require('./Util/PathResolver.js');

var _PathResolver2 = _interopRequireDefault(_PathResolver);

var _DocFactory = require('./Factory/DocFactory.js');

var _DocFactory2 = _interopRequireDefault(_DocFactory);

var _TestDocFactory = require('./Factory/TestDocFactory.js');

var _TestDocFactory2 = _interopRequireDefault(_TestDocFactory);

var _InvalidCodeLogger = require('./Util/InvalidCodeLogger.js');

var _InvalidCodeLogger2 = _interopRequireDefault(_InvalidCodeLogger);

var _Plugin = require('./Plugin/Plugin.js');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * API Documentation Generator.
 *
 * @example
 * let config = {source: './src', destination: './esdoc'};
 * ESDoc.generate(config, (results, config)=>{
 *   console.log(results);
 * });
 */

var ESDoc = function () {
  function ESDoc() {
    _classCallCheck(this, ESDoc);
  }

  _createClass(ESDoc, null, [{
    key: 'generate',

    /**
     * Generate documentation.
     * @param {ESDocConfig} config - config for generation.
     * @param {function(results: Object[], asts: Object[], config: ESDocConfig)} publisher - callback for output html.
     */
    value: function generate(config, publisher) {
      var _this = this;

      (0, _assert2.default)(typeof publisher === 'function');
      (0, _assert2.default)(config.source);
      (0, _assert2.default)(config.destination);

      _Plugin2.default.init(config.plugins);
      _Plugin2.default.onStart();
      config = _Plugin2.default.onHandleConfig(config);

      this._setDefaultConfig(config);
      this._deprecatedConfig(config);

      _colorLogger2.default.debug = !!config.debug;
      var includes = config.includes.map(function (v) {
        return new RegExp(v);
      });
      var excludes = config.excludes.map(function (v) {
        return new RegExp(v);
      });

      var packageName = null;
      var mainFilePath = null;
      if (config.package) {
        try {
          var packageJSON = _fs2.default.readFileSync(config.package, { encode: 'utf8' });
          var packageConfig = JSON.parse(packageJSON);
          packageName = packageConfig.name;
          mainFilePath = packageConfig.main;
        } catch (e) {
          // ignore
        }
      }

      var results = [];
      var asts = [];
      var sourceDirPath = _path2.default.resolve(config.source);

      this._walk(config.source, function (filePath) {
        var _results;

        var relativeFilePath = _path2.default.relative(sourceDirPath, filePath);
        var match = false;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = includes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var reg = _step.value;

            if (relativeFilePath.match(reg)) {
              match = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (!match) return;

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = excludes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _reg = _step2.value;

            if (relativeFilePath.match(_reg)) return;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var temp = _this._traverse(config.source, filePath, packageName, mainFilePath);
        if (!temp) return;
        (_results = results).push.apply(_results, _toConsumableArray(temp.results));

        asts.push({ filePath: 'source' + _path2.default.sep + relativeFilePath, ast: temp.ast });
      });

      if (config.builtinExternal) {
        this._useBuiltinExternal(results);
      }

      if (config.test) {
        this._generateForTest(config, results, asts);
      }

      results = _Plugin2.default.onHandleTag(results);

      publisher(results, asts, config);

      _Plugin2.default.onComplete();
    }

    /**
     * Generate document from test code.
     * @param {ESDocConfig} config - config for generating.
     * @param {DocObject[]} results - push DocObject to this.
     * @param {AST[]} asts - push ast to this.
     * @private
     */

  }, {
    key: '_generateForTest',
    value: function _generateForTest(config, results, asts) {
      var _this2 = this;

      var includes = config.test.includes.map(function (v) {
        return new RegExp(v);
      });
      var excludes = config.test.excludes.map(function (v) {
        return new RegExp(v);
      });
      var sourceDirPath = _path2.default.resolve(config.test.source);

      this._walk(config.test.source, function (filePath) {
        var relativeFilePath = _path2.default.relative(sourceDirPath, filePath);
        var match = false;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = includes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var reg = _step3.value;

            if (relativeFilePath.match(reg)) {
              match = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        if (!match) return;

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = excludes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _reg2 = _step4.value;

            if (relativeFilePath.match(_reg2)) return;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        var temp = _this2._traverseForTest(config.test.type, config.test.source, filePath);
        if (!temp) return;
        results.push.apply(results, _toConsumableArray(temp.results));

        asts.push({ filePath: 'test' + _path2.default.sep + relativeFilePath, ast: temp.ast });
      });
    }

    /**
     * set default config to specified config.
     * @param {ESDocConfig} config - specified config.
     * @private
     */

  }, {
    key: '_setDefaultConfig',
    value: function _setDefaultConfig(config) {
      if (!config.includes) config.includes = ['\\.(js|es6)$'];

      if (!config.excludes) config.excludes = ['\\.config\\.(js|es6)$'];

      if (!config.access) config.access = ['public', 'protected'];

      if (!('autoPrivate' in config)) config.autoPrivate = true;

      if (!('unexportIdentifier' in config)) config.unexportIdentifier = false;

      if (!('builtinExternal' in config)) config.builtinExternal = true;

      if (!('undocumentIdentifier' in config)) config.undocumentIdentifier = true;

      if (!('coverage' in config)) config.coverage = true;

      if (!('includeSource' in config)) config.includeSource = true;

      if (!('lint' in config)) config.lint = true;

      if (!config.index) config.index = './README.md';

      if (!config.package) config.package = './package.json';

      if (!config.styles) config.styles = [];

      if (!config.scripts) config.scripts = [];

      if (config.test) {
        (0, _assert2.default)(config.test.type);
        (0, _assert2.default)(config.test.source);
        if (!config.test.includes) config.test.includes = ['(spec|Spec|test|Test)\\.(js|es6)$'];
        if (!config.test.excludes) config.test.excludes = ['\\.config\\.(js|es6)$'];
      }
    }
  }, {
    key: '_deprecatedConfig',
    value: function _deprecatedConfig(config) {
      if (config.importPathPrefix) {
        console.log('[31m[deprecated] config.importPathPrefix is deprecated. use esdoc-importpath-plugin(https://github.com/esdoc/esdoc-importpath-plugin)[0m');
      }
    }

    /**
     * Use built-in external document.
     * built-in external has number, string, boolean, etc...
     * @param {DocObject[]} results - this method pushes DocObject to this param.
     * @private
     * @see {@link src/BuiltinExternal/ECMAScriptExternal.js}
     */

  }, {
    key: '_useBuiltinExternal',
    value: function _useBuiltinExternal(results) {
      var _this3 = this;

      var dirPath = _path2.default.resolve(__dirname, './BuiltinExternal/');
      this._walk(dirPath, function (filePath) {
        var temp = _this3._traverse(dirPath, filePath);
        temp.results.forEach(function (v) {
          return v.builtinExternal = true;
        });
        var res = temp.results.filter(function (v) {
          return v.kind === 'external';
        });
        results.push.apply(results, _toConsumableArray(res));
      });
    }

    /**
     * walk recursive in directory.
     * @param {string} dirPath - target directory path.
     * @param {function(entryPath: string)} callback - callback for find file.
     * @private
     */

  }, {
    key: '_walk',
    value: function _walk(dirPath, callback) {
      var entries = _fs2.default.readdirSync(dirPath);

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = entries[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var entry = _step5.value;

          var entryPath = _path2.default.resolve(dirPath, entry);
          var stat = _fs2.default.statSync(entryPath);

          if (stat.isFile()) {
            callback(entryPath);
          } else if (stat.isDirectory()) {
            this._walk(entryPath, callback);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
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

  }, {
    key: '_traverse',
    value: function _traverse(inDirPath, filePath, packageName, mainFilePath) {
      _colorLogger2.default.i('parsing: ' + filePath);
      var ast = void 0;
      try {
        ast = _ESParser2.default.parse(filePath);
      } catch (e) {
        _InvalidCodeLogger2.default.showFile(filePath, e);
        return null;
      }

      var pathResolver = new _PathResolver2.default(inDirPath, filePath, packageName, mainFilePath);
      var factory = new _DocFactory2.default(ast, pathResolver);

      _ASTUtil2.default.traverse(ast, function (node, parent) {
        try {
          factory.push(node, parent);
        } catch (e) {
          _InvalidCodeLogger2.default.show(filePath, node);
          throw e;
        }
      });

      return { results: factory.results, ast: ast };
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

  }, {
    key: '_traverseForTest',
    value: function _traverseForTest(type, inDirPath, filePath) {
      var ast = void 0;
      try {
        ast = _ESParser2.default.parse(filePath);
      } catch (e) {
        _InvalidCodeLogger2.default.showFile(filePath, e);
        return null;
      }
      var pathResolver = new _PathResolver2.default(inDirPath, filePath);
      var factory = new _TestDocFactory2.default(type, ast, pathResolver);

      _ASTUtil2.default.traverse(ast, function (node, parent) {
        try {
          factory.push(node, parent);
        } catch (e) {
          _InvalidCodeLogger2.default.show(filePath, node);
          throw e;
        }
      });

      return { results: factory.results, ast: ast };
    }
  }]);

  return ESDoc;
}();

exports.default = ESDoc;
module.exports = exports['default'];