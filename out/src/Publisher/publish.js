'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = publish;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _taffydb = require('taffydb');

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _StaticFileBuilder = require('./Builder/StaticFileBuilder.js');

var _StaticFileBuilder2 = _interopRequireDefault(_StaticFileBuilder);

var _IdentifiersDocBuilder = require('./Builder/IdentifiersDocBuilder.js');

var _IdentifiersDocBuilder2 = _interopRequireDefault(_IdentifiersDocBuilder);

var _IndexDocBuilder = require('./Builder/IndexDocBuilder.js');

var _IndexDocBuilder2 = _interopRequireDefault(_IndexDocBuilder);

var _ClassDocBuilder = require('./Builder/ClassDocBuilder.js');

var _ClassDocBuilder2 = _interopRequireDefault(_ClassDocBuilder);

var _SingleDocBuilder = require('./Builder/SingleDocBuilder.js');

var _SingleDocBuilder2 = _interopRequireDefault(_SingleDocBuilder);

var _FileDocBuilder = require('./Builder/FileDocBuilder.js');

var _FileDocBuilder2 = _interopRequireDefault(_FileDocBuilder);

var _SearchIndexBuilder = require('./Builder/SearchIndexBuilder.js');

var _SearchIndexBuilder2 = _interopRequireDefault(_SearchIndexBuilder);

var _CoverageBuilder = require('./Builder/CoverageBuilder.js');

var _CoverageBuilder2 = _interopRequireDefault(_CoverageBuilder);

var _ASTDocBuilder = require('./Builder/ASTDocBuilder.js');

var _ASTDocBuilder2 = _interopRequireDefault(_ASTDocBuilder);

var _SourceDocBuilder = require('./Builder/SourceDocBuilder.js');

var _SourceDocBuilder2 = _interopRequireDefault(_SourceDocBuilder);

var _TestDocBuilder = require('./Builder/TestDocBuilder.js');

var _TestDocBuilder2 = _interopRequireDefault(_TestDocBuilder);

var _TestFileDocBuilder = require('./Builder/TestFileDocBuilder.js');

var _TestFileDocBuilder2 = _interopRequireDefault(_TestFileDocBuilder);

var _ManualDocBuilder = require('./Builder/ManualDocBuilder.js');

var _ManualDocBuilder2 = _interopRequireDefault(_ManualDocBuilder);

var _LintDocBuilder = require('./Builder/LintDocBuilder.js');

var _LintDocBuilder2 = _interopRequireDefault(_LintDocBuilder);

var _Plugin = require('../Plugin/Plugin.js');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * publish document as HTML.
 * @param {DocObject[]} values - all doc objects.
 * @param {AST[]} asts - all ASTs.
 * @param {ESDocConfig} config - ESDoc config object.
 */
function publish(values, asts, config) {
  _iceCap2.default.debug = !!config.debug;

  if (!config.includeSource) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        if (['file', 'testFile'].includes(value.kind) && 'content' in value) {
          value.content = '';
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
  }

  var dumpPath = _path2.default.resolve(config.destination, 'dump.json');
  _fsExtra2.default.outputFileSync(dumpPath, JSON.stringify(values, null, 2));

  var data = (0, _taffydb.taffy)(values);
  var _coverage = null;

  function log(text) {
    console.log(text);
  }

  function writeHTML(html, fileName) {
    log(fileName);
    html = _Plugin2.default.onHandleHTML(html, fileName);
    var filePath = _path2.default.resolve(config.destination, fileName);
    _fsExtra2.default.outputFileSync(filePath, html, { encoding: 'utf8' });
  }

  function writeCoverage(coverage, fileName) {
    _coverage = coverage;
    var json = JSON.stringify(coverage, null, 2);
    var filePath = _path2.default.resolve(config.destination, fileName);
    _fsExtra2.default.outputFileSync(filePath, json, { encoding: 'utf8' });
  }

  function writeBadge(badge, fileName) {
    log(fileName);
    var filePath = _path2.default.resolve(config.destination, fileName);
    _fsExtra2.default.outputFileSync(filePath, badge, { encoding: 'utf8' });
  }

  function writeAST(astJSON, fileName) {
    var filePath = _path2.default.resolve(config.destination, fileName);
    _fsExtra2.default.outputFileSync(filePath, astJSON, { encoding: 'utf8' });
  }

  function copy(srcPath, destPath) {
    log(destPath);
    _fsExtra2.default.copySync(srcPath, _path2.default.resolve(config.destination, destPath));
  }

  if (config.coverage) {
    new _CoverageBuilder2.default(data, config).exec(writeCoverage, writeBadge);
  }

  new _IdentifiersDocBuilder2.default(data, config).exec(writeHTML);
  new _IndexDocBuilder2.default(data, config, _coverage).exec(writeHTML);
  new _ClassDocBuilder2.default(data, config).exec(writeHTML);
  new _SingleDocBuilder2.default(data, config).exec(writeHTML);
  new _FileDocBuilder2.default(data, config).exec(writeHTML);
  new _StaticFileBuilder2.default(data, config).exec(copy);
  new _SearchIndexBuilder2.default(data, config).exec(writeHTML);
  new _ASTDocBuilder2.default(data, asts, config).exec(writeAST);
  new _SourceDocBuilder2.default(data, config, _coverage).exec(writeHTML);
  new _ManualDocBuilder2.default(data, config).exec(writeHTML, copy);

  // package.json
  try {
    var json = _fsExtra2.default.readFileSync(config.package, { encoding: 'utf-8' });
    var filePath = _path2.default.resolve(config.destination, 'package.json');
    _fsExtra2.default.outputFileSync(filePath, json, { encoding: 'utf8' });
  } catch (e) {
    // ignore
  }

  if (config.test) {
    new _TestDocBuilder2.default(data, config).exec(writeHTML);
    new _TestFileDocBuilder2.default(data, config).exec(writeHTML);
  }

  if (config.coverage) {
    console.log('==================================');
    console.log('Coverage: ' + _coverage.coverage + ' (' + _coverage.actualCount + '/' + _coverage.expectCount + ')');
    console.log('==================================');
  }

  if (config.lint) {
    new _LintDocBuilder2.default(data, config).exec();
  }
};