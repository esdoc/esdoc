'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _AbstractDocJs = require('./AbstractDoc.js');

var _AbstractDocJs2 = _interopRequireDefault(_AbstractDocJs);

var _ParserParamParserJs = require('../Parser/ParamParser.js');

var _ParserParamParserJs2 = _interopRequireDefault(_ParserParamParserJs);

/**
 * Doc Class from Function declaration AST node.
 */

var FunctionDoc = (function (_AbstractDoc) {
  function FunctionDoc() {
    _classCallCheck(this, FunctionDoc);

    _get(Object.getPrototypeOf(FunctionDoc.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(FunctionDoc, _AbstractDoc);

  _createClass(FunctionDoc, [{
    key: '@kind',

    /** specify ``function`` to kind. */
    value: function kind() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@kind', this).call(this);
      if (this._value.kind) return;
      this._value.kind = 'function';
    }
  }, {
    key: '@name',

    /** take out self name from self node */
    value: function name() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@name', this).call(this);
      if (this._value.name) return;
      this._value.name = this._node.id.name;
    }
  }, {
    key: '@memberof',

    /** take out self name from file path */
    value: function memberof() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@memberof', this).call(this);
      if (this._value.memberof) return;
      this._value.memberof = this._pathResolver.filePath;
    }
  }, {
    key: '@generator',

    /** check generator property in self node */
    value: function generator() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@generator', this).call(this);
      if ('generator' in this._value) return;

      this._value.generator = this._node.generator;
    }
  }, {
    key: '@param',

    /** if @param is not exists, guess type of param by using self node. */
    value: function param() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@param', this).call(this);
      if (this._value.params) return;

      this._value.params = _ParserParamParserJs2['default'].guessParams(this._node.params);
    }
  }, {
    key: '@return',

    /** if @return is not exists, guess type of return by using self node. */
    value: function _return() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@return', this).call(this);
      if (this._value['return']) return;

      var result = _ParserParamParserJs2['default'].guessReturnParam(this._node.body);
      if (result) {
        this._value['return'] = result;
      }
    }
  }]);

  return FunctionDoc;
})(_AbstractDocJs2['default']);

exports['default'] = FunctionDoc;
module.exports = exports['default'];