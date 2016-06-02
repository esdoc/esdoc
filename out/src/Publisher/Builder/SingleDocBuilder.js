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
 * Single output builder class.
 * "single" means function, variable, typedef, external, etc...
 */

var SingleDocBuilder = function (_DocBuilder) {
  _inherits(SingleDocBuilder, _DocBuilder);

  function SingleDocBuilder() {
    _classCallCheck(this, SingleDocBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SingleDocBuilder).apply(this, arguments));
  }

  _createClass(SingleDocBuilder, [{
    key: 'exec',

    /**
     * execute building output.
     * @param {function(html: string, filePath: string)} callback - is called with output.
     */
    value: function exec(callback) {
      var ice = this._buildLayoutDoc();
      ice.autoClose = false;

      var kinds = ['function', 'variable', 'typedef'];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = kinds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var kind = _step.value;

          var docs = this._find({ kind: kind });
          if (!docs.length) continue;
          var fileName = this._getOutputFileName(docs[0]);
          var baseUrl = this._getBaseUrl(fileName);
          var title = kind.replace(/^(\w)/, function (c) {
            return c.toUpperCase();
          });
          title = this._getTitle(title);

          ice.load('content', this._buildSingleDoc(kind), _iceCap2.default.MODE_WRITE);
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
     * build single output.
     * @param {string} kind - target kind property.
     * @returns {string} html of single output
     * @private
     */

  }, {
    key: '_buildSingleDoc',
    value: function _buildSingleDoc(kind) {
      var title = kind.replace(/^(\w)/, function (c) {
        return c.toUpperCase();
      });
      var ice = new _iceCap2.default(this._readTemplate('single.html'));
      ice.text('title', title);
      ice.load('summaries', this._buildSummaryHTML(null, kind, 'Summary'), 'append');
      ice.load('details', this._buildDetailHTML(null, kind, ''));
      return ice.html;
    }
  }]);

  return SingleDocBuilder;
}(_DocBuilder3.default);

exports.default = SingleDocBuilder;