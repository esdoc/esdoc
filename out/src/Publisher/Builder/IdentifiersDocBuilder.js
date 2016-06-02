'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _DocBuilder2 = require('./DocBuilder.js');

var _DocBuilder3 = _interopRequireDefault(_DocBuilder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Identifier output builder class.
 */

var IdentifiersDocBuilder = function (_DocBuilder) {
  _inherits(IdentifiersDocBuilder, _DocBuilder);

  function IdentifiersDocBuilder() {
    _classCallCheck(this, IdentifiersDocBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IdentifiersDocBuilder).apply(this, arguments));
  }

  _createClass(IdentifiersDocBuilder, [{
    key: 'exec',

    /**
     * execute building output.
     * @param {function(html: string, filePath: string)} callback - is called with output.
     */
    value: function exec(callback) {
      var ice = this._buildLayoutDoc();
      var title = this._getTitle('Index');
      ice.load('content', this._buildIdentifierDoc());
      ice.text('title', title, _iceCap2.default.MODE_WRITE);
      callback(ice.html, 'identifiers.html');
    }

    /**
     * build identifier output.
     * @return {IceCap} built output.
     * @private
     */

  }, {
    key: '_buildIdentifierDoc',
    value: function _buildIdentifierDoc() {
      var indexInfo = this._getInfo();

      var ice = new _iceCap2.default(this._readTemplate('identifiers.html'));

      ice.text('title', indexInfo.title);
      ice.text('version', indexInfo.version, 'append');
      ice.text('url', indexInfo.url);
      ice.attr('url', 'href', indexInfo.url);
      ice.text('description', indexInfo.desc);

      ice.load('classSummary', this._buildSummaryHTML(null, 'class', 'Class Summary'), 'append');
      ice.load('interfaceSummary', this._buildSummaryHTML(null, 'interface', 'Interface Summary'), 'append');
      ice.load('functionSummary', this._buildSummaryHTML(null, 'function', 'Function Summary'), 'append');
      ice.load('variableSummary', this._buildSummaryHTML(null, 'variable', 'Variable Summary'), 'append');
      ice.load('typedefSummary', this._buildSummaryHTML(null, 'typedef', 'Typedef Summary'), 'append');
      ice.load('externalSummary', this._buildSummaryHTML(null, 'external', 'External Summary'), 'append');

      return ice;
    }
  }]);

  return IdentifiersDocBuilder;
}(_DocBuilder3.default);

exports.default = IdentifiersDocBuilder;