'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

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
 * Index output builder class.
 */

var IndexDocBuilder = function (_DocBuilder) {
  _inherits(IndexDocBuilder, _DocBuilder);

  /**
   * create instance.
   * @param {Taffy} data - doc object database.
   * @param {ESDocConfig} config - use config to build output.
   * @param {CoverageObject} coverage - use coverage to build output.
   */

  function IndexDocBuilder(data, config, coverage) {
    _classCallCheck(this, IndexDocBuilder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IndexDocBuilder).call(this, data, config));

    _this._coverage = coverage;
    return _this;
  }

  /**
   * execute building output.
   * @param {function(html: string, filePath: string)} callback - is called with output.
   */


  _createClass(IndexDocBuilder, [{
    key: 'exec',
    value: function exec(callback) {
      var ice = this._buildLayoutDoc();
      var title = this._getTitle();
      ice.load('content', this._buildIndexDoc());
      ice.text('title', title, _iceCap2.default.MODE_WRITE);
      callback(ice.html, 'index.html');
    }

    /**
     * build index output.
     * @returns {string} html of index output.
     * @private
     */

  }, {
    key: '_buildIndexDoc',
    value: function _buildIndexDoc() {
      if (!this._config.index) return 'Please create README.md';

      var indexContent = void 0;
      try {
        indexContent = _fs2.default.readFileSync(this._config.index, { encode: 'utf8' }).toString();
      } catch (e) {
        return 'Please create README.md';
      }

      var html = this._readTemplate('index.html');
      var ice = new _iceCap2.default(html);
      var ext = _path2.default.extname(this._config.index);
      if (['.md', '.markdown'].includes(ext)) {
        ice.load('index', (0, _util.markdown)(indexContent));
      } else {
        ice.load('index', indexContent);
      }

      var result = ice.html;

      // fixme: deprecated
      if (this._config.coverage) {
        var $ = _cheerio2.default.load(result);
        if ($('.esdoc-coverage').length) {
          console.log('[31m[deprecated] coverage badge is deprecated. use badge of ESDoc Hosting Service(https://doc.esdoc.org)[0m');
        }
      }

      return result;
    }
  }]);

  return IndexDocBuilder;
}(_DocBuilder3.default);

exports.default = IndexDocBuilder;