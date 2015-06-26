'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = publish;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _taffydb = require('taffydb');

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _BuilderStaticFileBuilderJs = require('./Builder/StaticFileBuilder.js');

var _BuilderStaticFileBuilderJs2 = _interopRequireDefault(_BuilderStaticFileBuilderJs);

var _BuilderIdentifiersDocBuilderJs = require('./Builder/IdentifiersDocBuilder.js');

var _BuilderIdentifiersDocBuilderJs2 = _interopRequireDefault(_BuilderIdentifiersDocBuilderJs);

var _BuilderIndexDocBuilderJs = require('./Builder/IndexDocBuilder.js');

var _BuilderIndexDocBuilderJs2 = _interopRequireDefault(_BuilderIndexDocBuilderJs);

var _BuilderClassDocBuilderJs = require('./Builder/ClassDocBuilder.js');

var _BuilderClassDocBuilderJs2 = _interopRequireDefault(_BuilderClassDocBuilderJs);

var _BuilderSingleDocBuilderJs = require('./Builder/SingleDocBuilder.js');

var _BuilderSingleDocBuilderJs2 = _interopRequireDefault(_BuilderSingleDocBuilderJs);

var _BuilderFileDocBuilderJs = require('./Builder/FileDocBuilder.js');

var _BuilderFileDocBuilderJs2 = _interopRequireDefault(_BuilderFileDocBuilderJs);

var _BuilderSearchIndexBuilderJs = require('./Builder/SearchIndexBuilder.js');

var _BuilderSearchIndexBuilderJs2 = _interopRequireDefault(_BuilderSearchIndexBuilderJs);

var _BuilderCoverageBuilderJs = require('./Builder/CoverageBuilder.js');

var _BuilderCoverageBuilderJs2 = _interopRequireDefault(_BuilderCoverageBuilderJs);

var _BuilderASTDocBuilderJs = require('./Builder/ASTDocBuilder.js');

var _BuilderASTDocBuilderJs2 = _interopRequireDefault(_BuilderASTDocBuilderJs);

var _BuilderSourceDocBuilderJs = require('./Builder/SourceDocBuilder.js');

var _BuilderSourceDocBuilderJs2 = _interopRequireDefault(_BuilderSourceDocBuilderJs);

var _BuilderTestDocBuilderJs = require('./Builder/TestDocBuilder.js');

var _BuilderTestDocBuilderJs2 = _interopRequireDefault(_BuilderTestDocBuilderJs);

var _BuilderTestFileDocBuilderJs = require('./Builder/TestFileDocBuilder.js');

var _BuilderTestFileDocBuilderJs2 = _interopRequireDefault(_BuilderTestFileDocBuilderJs);

/**
 * publish document as HTML.
 * @param {DocObject[]} values - all doc objects.
 * @param {AST[]} asts - all ASTs.
 * @param {ESDocConfig} config - ESDoc config object.
 */

function publish(values, asts, config) {
  _iceCap2['default'].debug = !!config.debug;

  var dumpPath = _path2['default'].resolve(config.destination, 'dump.json');
  _fsExtra2['default'].outputFileSync(dumpPath, JSON.stringify(values, null, 2));

  var data = (0, _taffydb.taffy)(values);
  var _coverage = null;

  function log(text) {
    console.log(text);
  }

  function writeHTML(html, fileName) {
    log(fileName);
    var filePath = _path2['default'].resolve(config.destination, fileName);
    _fsExtra2['default'].outputFileSync(filePath, html, { encoding: 'utf8' });
  }

  function writeCoverage(coverage, fileName) {
    _coverage = coverage;
    var json = JSON.stringify(coverage, null, 2);
    var filePath = _path2['default'].resolve(config.destination, fileName);
    _fsExtra2['default'].outputFileSync(filePath, json, { encoding: 'utf8' });
  }

  function writeAST(astJSON, fileName) {
    var filePath = _path2['default'].resolve(config.destination, fileName);
    _fsExtra2['default'].outputFileSync(filePath, astJSON, { encoding: 'utf8' });
  }

  function copy(srcPath, destPath) {
    log(destPath);
    _fsExtra2['default'].copySync(srcPath, _path2['default'].resolve(config.destination, destPath));
  }

  if (config.coverage) {
    new _BuilderCoverageBuilderJs2['default'](data, config).exec(writeCoverage);
  }

  new _BuilderIdentifiersDocBuilderJs2['default'](data, config).exec(writeHTML);
  new _BuilderIndexDocBuilderJs2['default'](data, config, _coverage).exec(writeHTML);
  new _BuilderClassDocBuilderJs2['default'](data, config).exec(writeHTML);
  new _BuilderSingleDocBuilderJs2['default'](data, config).exec(writeHTML);
  new _BuilderFileDocBuilderJs2['default'](data, config).exec(writeHTML);
  new _BuilderStaticFileBuilderJs2['default'](data, config).exec(copy);
  new _BuilderSearchIndexBuilderJs2['default'](data, config).exec(writeHTML);
  new _BuilderASTDocBuilderJs2['default'](data, asts, config).exec(writeAST);
  new _BuilderSourceDocBuilderJs2['default'](data, config, _coverage).exec(writeHTML);

  if (config.test) {
    new _BuilderTestDocBuilderJs2['default'](data, config).exec(writeHTML);
    new _BuilderTestFileDocBuilderJs2['default'](data, config).exec(writeHTML);
  }

  if (config.coverage) {
    console.log('==================================');
    console.log('Coverage: ' + _coverage.coverage + ' (' + _coverage.actualCount + '/' + _coverage.expectCount + ')');
    console.log('==================================');
  }
}

;
module.exports = exports['default'];