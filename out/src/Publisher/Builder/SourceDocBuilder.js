'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _DocBuilderJs = require('./DocBuilder.js');

var _DocBuilderJs2 = _interopRequireDefault(_DocBuilderJs);

var _utilJs = require('./util.js');

/**
 * Source output html builder class.
 */

var SourceDocBuilder = (function (_DocBuilder) {
  /**
   * create instance.
   * @param {Taffy} data - doc object database.
   * @param {ESDocConfig} config - use config to build output.
   * @param {CoverageObject} coverage - use coverage to build output.
   */

  function SourceDocBuilder(data, config, coverage) {
    _classCallCheck(this, SourceDocBuilder);

    _get(Object.getPrototypeOf(SourceDocBuilder.prototype), 'constructor', this).call(this, data, config);
    this._coverage = coverage;
  }

  _inherits(SourceDocBuilder, _DocBuilder);

  _createClass(SourceDocBuilder, [{
    key: 'exec',

    /**
     * execute building output html.
     * @param {function(html: string, filePath: string)} callback - is called with output html.
     */
    value: function exec(callback) {
      var ice = this._buildLayoutDoc();
      var fileName = 'source.html';
      var baseUrl = this._getBaseUrl(fileName);
      var title = this._getTitle('Source');

      ice.attr('baseUrl', 'href', baseUrl);
      ice.load('content', this._buildSourceHTML());
      ice.text('title', title, _iceCap2['default'].MODE_WRITE);

      callback(ice.html, fileName);
    }
  }, {
    key: '_buildSourceHTML',

    /**
     * build source list output html.
     * @returns {string} html of source list.
     * @private
     */
    value: function _buildSourceHTML() {
      var _this = this;

      var ice = new _iceCap2['default'](this._readTemplate('source.html'));
      var docs = this._find({ kind: 'file' });
      var config = this._config;
      var useCoverage = this._config.coverage;
      var coverage = undefined;
      if (useCoverage) coverage = this._coverage.files;

      if (useCoverage) ice.load('coverageBadge', this._buildCoverageHTML(this._coverage));
      ice.attr('files', 'data-use-coverage', !!useCoverage);

      if (useCoverage) {
        var actual = this._coverage.actualCount;
        var expect = this._coverage.expectCount;
        var coverageCount = actual + '/' + expect;
        ice.text('totalCoverageCount', coverageCount);
      }

      ice.loop('file', docs, function (i, doc, ice) {
        var filePath = doc.longname;
        var absFilePath = _path2['default'].resolve(_path2['default'].dirname(config.source), filePath);
        var content = _fs2['default'].readFileSync(absFilePath).toString();
        var lines = content.split('\n').length - 1;
        var stat = _fs2['default'].statSync(absFilePath);
        var date = (0, _utilJs.dateForUTC)(stat.ctime);
        var coverageRatio = undefined;
        var coverageCount = undefined;
        if (useCoverage && coverage[filePath]) {
          var actual = coverage[filePath].actualCount;
          var expect = coverage[filePath].expectCount;
          coverageRatio = Math.floor(100 * actual / expect) + ' %';
          coverageCount = actual + '/' + expect;
        } else {
          coverageRatio = '-';
        }

        var identifierDocs = _this._find({
          longname: { left: doc.longname + '~' },
          kind: ['class', 'function', 'variable'] });
        var identifiers = identifierDocs.map(function (doc) {
          return _this._buildDocLinkHTML(doc.longname);
        });

        ice.load('filePath', _this._buildFileDocLinkHTML(doc));
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
})(_DocBuilderJs2['default']);

exports['default'] = SourceDocBuilder;
module.exports = exports['default'];