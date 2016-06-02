'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _DocBuilder2 = require('./DocBuilder.js');

var _DocBuilder3 = _interopRequireDefault(_DocBuilder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * File output builder class.
 */

var FileDocBuilder = function (_DocBuilder) {
  _inherits(FileDocBuilder, _DocBuilder);

  function FileDocBuilder() {
    _classCallCheck(this, FileDocBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FileDocBuilder).apply(this, arguments));
  }

  _createClass(FileDocBuilder, [{
    key: 'exec',

    /**
     * execute building output.
     * @param {function(html: string, filePath: string)} callback - is called with each file.
     */
    value: function exec(callback) {
      var ice = this._buildLayoutDoc();

      var docs = this._find({ kind: 'file' });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var doc = _step.value;

          var fileName = this._getOutputFileName(doc);
          var baseUrl = this._getBaseUrl(fileName);
          var title = this._getTitle(doc);
          ice.load('content', this._buildFileDoc(doc), _iceCap2.default.MODE_WRITE);
          ice.attr('baseUrl', 'href', baseUrl, _iceCap2.default.MODE_WRITE);
          ice.text('title', title, _iceCap2.default.MODE_WRITE);
          callback(ice.html, fileName);
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

    /**
     * build file output html.
     * @param {DocObject} doc - target file doc object.
     * @returns {string} html of file page.
     * @private
     */

  }, {
    key: '_buildFileDoc',
    value: function _buildFileDoc(doc) {
      var ice = new _iceCap2.default(this._readTemplate('file.html'));
      ice.text('title', doc.longname);
      ice.text('content', doc.content);
      ice.drop('emptySourceCode', !!doc.content);
      return ice.html;
    }
  }]);

  return FileDocBuilder;
}(_DocBuilder3.default);

exports.default = FileDocBuilder;