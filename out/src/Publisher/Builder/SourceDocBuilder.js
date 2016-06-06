'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _DocBuilder2 = require('./DocBuilder.js');

var _DocBuilder3 = _interopRequireDefault(_DocBuilder2);

var _util = require('./util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Source output html builder class.
 */

var SourceDocBuilder = function (_DocBuilder) {
  _inherits(SourceDocBuilder, _DocBuilder);

  /**
   * create instance.
   * @param {Taffy} data - doc object database.
   * @param {ESDocConfig} config - use config to build output.
   * @param {CoverageObject} coverage - use coverage to build output.
   */

  function SourceDocBuilder(data, config, coverage) {
    _classCallCheck(this, SourceDocBuilder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SourceDocBuilder).call(this, data, config));

    _this._coverage = coverage;
    return _this;
  }

  /**
   * execute building output html.
   * @param {function(html: string, filePath: string)} callback - is called with output html.
   */


  _createClass(SourceDocBuilder, [{
    key: 'exec',
    value: function exec(callback) {
      var ice = this._buildLayoutDoc();
      var fileName = 'source.html';
      var baseUrl = this._getBaseUrl(fileName);
      var title = this._getTitle('Source');

      ice.attr('baseUrl', 'href', baseUrl);
      ice.load('content', this._buildSourceHTML());
      ice.text('title', title, _iceCap2.default.MODE_WRITE);

      callback(ice.html, fileName);
    }

    /**
     * build source list output html.
     * @returns {string} html of source list.
     * @private
     */

  }, {
    key: '_buildSourceHTML',
    value: function _buildSourceHTML() {
      var _this2 = this;

      var ice = new _iceCap2.default(this._readTemplate('source.html'));
      var docs = this._find({ kind: 'file' });
      var config = this._config;
      var useCoverage = this._config.coverage;
      var coverage = void 0;
      if (useCoverage) coverage = this._coverage.files;

      ice.drop('coverageBadge', !useCoverage);
      ice.attr('files', 'data-use-coverage', !!useCoverage);

      if (useCoverage) {
        var actual = this._coverage.actualCount;
        var expect = this._coverage.expectCount;
        var coverageCount = actual + '/' + expect;
        ice.text('totalCoverageCount', coverageCount);
      }

      ice.loop('file', docs, function (i, doc, ice) {
        var sourceDirPath = _path2.default.resolve(config.source);
        var filePath = doc.longname;
        var absFilePath = _path2.default.resolve(_path2.default.dirname(sourceDirPath), filePath);
        var content = _fs2.default.readFileSync(absFilePath).toString();
        var lines = content.split('\n').length - 1;
        var stat = _fs2.default.statSync(absFilePath);
        var date = (0, _util.dateForUTC)(stat.ctime);
        var coverageRatio = void 0;
        var coverageCount = void 0;
        var undocumentLines = void 0;
        if (useCoverage && coverage[filePath]) {
          var _actual = coverage[filePath].actualCount;
          var _expect = coverage[filePath].expectCount;
          coverageRatio = Math.floor(100 * _actual / _expect) + ' %';
          coverageCount = _actual + '/' + _expect;
          undocumentLines = coverage[filePath].undocumentLines.sort().join(',');
        } else {
          coverageRatio = '-';
        }

        var identifierDocs = _this2._find({
          longname: { left: doc.longname + '~' },
          kind: ['class', 'function', 'variable'] });
        var identifiers = identifierDocs.map(function (doc) {
          return _this2._buildDocLinkHTML(doc.longname);
        });

        if (undocumentLines) {
          var url = _this2._getURL(doc);
          var link = _this2._buildFileDocLinkHTML(doc).replace(/href=".*\.html"/, 'href="' + url + '#errorLines=' + undocumentLines + '"');
          ice.load('filePath', link);
        } else {
          ice.load('filePath', _this2._buildFileDocLinkHTML(doc));
        }
        ice.text('coverage', coverageRatio);
        ice.text('coverageCount', coverageCount);
        ice.text('lines', lines);
        ice.text('updated', date);
        ice.text('size', stat.size + ' byte');
        ice.load('identifier', identifiers.join('\n') || '-');
      });
      return ice.html;
    }
  }]);

  return SourceDocBuilder;
}(_DocBuilder3.default);

exports.default = SourceDocBuilder;
module.exports = exports['default'];