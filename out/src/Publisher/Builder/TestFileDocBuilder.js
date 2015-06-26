'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _DocBuilderJs = require('./DocBuilder.js');

var _DocBuilderJs2 = _interopRequireDefault(_DocBuilderJs);

/**
 * File output html builder class.
 */

var FileDocBuilder = (function (_DocBuilder) {
  function FileDocBuilder() {
    _classCallCheck(this, FileDocBuilder);

    _get(Object.getPrototypeOf(FileDocBuilder.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(FileDocBuilder, _DocBuilder);

  _createClass(FileDocBuilder, [{
    key: 'exec',

    /**
     * execute building output html.
     * @param {function(html: string, filePath: string)} callback - is called with each output.
     */
    value: function exec(callback) {
      var ice = this._buildLayoutDoc();

      var docs = this._find({ kind: 'testFile' });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var doc = _step.value;

          var fileName = this._getOutputFileName(doc);
          var baseUrl = this._getBaseUrl(fileName);
          var title = this._getTitle(doc);
          ice.load('content', this._buildFileDoc(doc), _iceCap2['default'].MODE_WRITE);
          ice.attr('baseUrl', 'href', baseUrl, _iceCap2['default'].MODE_WRITE);
          ice.text('title', title, _iceCap2['default'].MODE_WRITE);
          callback(ice.html, fileName);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: '_buildFileDoc',

    /**
     * build file output html.
     * @param {DocObject} doc - target file doc object.
     * @returns {string} html of file output.
     * @private
     */
    value: function _buildFileDoc(doc) {
      var ice = new _iceCap2['default'](this._readTemplate('file.html'));
      ice.text('title', doc.longname);
      ice.text('content', doc.content);
      return ice.html;
    }
  }]);

  return FileDocBuilder;
})(_DocBuilderJs2['default']);

exports['default'] = FileDocBuilder;
module.exports = exports['default'];