'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _DocBuilderJs = require('./DocBuilder.js');

var _DocBuilderJs2 = _interopRequireDefault(_DocBuilderJs);

var _utilJs = require('./util.js');

/**
 * Index output builder class.
 */

var IndexDocBuilder = (function (_DocBuilder) {
  /**
   * create instance.
   * @param {Taffy} data - doc object database.
   * @param {ESDocConfig} config - use config to build output.
   * @param {CoverageObject} coverage - use coverage to build output.
   */

  function IndexDocBuilder(data, config, coverage) {
    _classCallCheck(this, IndexDocBuilder);

    _get(Object.getPrototypeOf(IndexDocBuilder.prototype), 'constructor', this).call(this, data, config);
    this._coverage = coverage;
  }

  _inherits(IndexDocBuilder, _DocBuilder);

  _createClass(IndexDocBuilder, [{
    key: 'exec',

    /**
     * execute building output.
     * @param {function(html: string, filePath: string)} callback - is called with output.
     */
    value: function exec(callback) {
      var ice = this._buildLayoutDoc();
      var title = this._getTitle();
      ice.load('content', this._buildIndexDoc());
      ice.text('title', title, _iceCap2['default'].MODE_WRITE);
      callback(ice.html, 'index.html');
    }
  }, {
    key: '_buildIndexDoc',

    /**
     * build index output.
     * @returns {string} html of index output.
     * @private
     */
    value: function _buildIndexDoc() {
      if (!this._config.index) return 'API Document';

      var indexContent = _fs2['default'].readFileSync(this._config.index, { encode: 'utf8' }).toString();

      var html = this._readTemplate('index.html');
      var ice = new _iceCap2['default'](html);
      var ext = _path2['default'].extname(this._config.index);
      if (['.md', '.markdown'].includes(ext)) {
        ice.load('index', (0, _utilJs.markdown)(indexContent));
      } else {
        ice.load('index', indexContent);
      }

      var result = ice.html;
      if (this._config.coverage) {
        var $ = _cheerio2['default'].load(result);
        $('.esdoc-coverage').html(this._buildCoverageHTML(this._coverage));
        result = $.root().html();
      }

      return result;
    }
  }]);

  return IndexDocBuilder;
})(_DocBuilderJs2['default']);

exports['default'] = IndexDocBuilder;
module.exports = exports['default'];