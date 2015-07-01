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
 * Doc Class from Variable Declaration AST node.
 */

var VariableDoc = (function (_AbstractDoc) {
  function VariableDoc() {
    _classCallCheck(this, VariableDoc);

    _get(Object.getPrototypeOf(VariableDoc.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(VariableDoc, _AbstractDoc);

  _createClass(VariableDoc, [{
    key: '@kind',

    /** specify ``variable`` to kind. */
    value: function kind() {
      _get(Object.getPrototypeOf(VariableDoc.prototype), '@kind', this).call(this);
      if (this._value.kind) return;

      this._value.kind = 'variable';
    }
  }, {
    key: '@name',

    /** set name by using self node. */
    value: function name() {
      _get(Object.getPrototypeOf(VariableDoc.prototype), '@name', this).call(this);
      if (this._value.name) return;

      this._value.name = this._node.declarations[0].id.name;
    }
  }, {
    key: '@memberof',

    /** set memberof by using file path. */
    value: function memberof() {
      _get(Object.getPrototypeOf(VariableDoc.prototype), '@memberof', this).call(this);
      if (this._value.memberof) return;
      this._value.memberof = this._pathResolver.filePath;
    }
  }, {
    key: '@type',

    /** if @type is not exists, guess type by using self node. */
    value: function type() {
      _get(Object.getPrototypeOf(VariableDoc.prototype), '@type', this).call(this);
      if (this._value.type) return;

      this._value.type = _ParserParamParserJs2['default'].guessType(this._node.declarations[0].init);
    }
  }]);

  return VariableDoc;
})(_AbstractDocJs2['default']);

exports['default'] = VariableDoc;
module.exports = exports['default'];