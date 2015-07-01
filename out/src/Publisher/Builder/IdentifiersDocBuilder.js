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

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _DocBuilderJs = require('./DocBuilder.js');

var _DocBuilderJs2 = _interopRequireDefault(_DocBuilderJs);

/**
 * Identifier output builder class.
 */

var IdentifiersDocBuilder = (function (_DocBuilder) {
  function IdentifiersDocBuilder() {
    _classCallCheck(this, IdentifiersDocBuilder);

    _get(Object.getPrototypeOf(IdentifiersDocBuilder.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(IdentifiersDocBuilder, _DocBuilder);

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
      ice.text('title', title, _iceCap2['default'].MODE_WRITE);
      callback(ice.html, 'identifiers.html');
    }
  }, {
    key: '_buildIdentifierDoc',

    /**
     * build identifier output.
     * @return {IceCap} built output.
     * @private
     */
    value: function _buildIdentifierDoc() {
      var indexInfo = this._getInfo();

      var ice = new _iceCap2['default'](this._readTemplate('identifiers.html'));

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

      return ice;
    }
  }]);

  return IdentifiersDocBuilder;
})(_DocBuilderJs2['default']);

exports['default'] = IdentifiersDocBuilder;
module.exports = exports['default'];