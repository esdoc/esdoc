'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractDoc2 = require('./AbstractDoc.js');

var _AbstractDoc3 = _interopRequireDefault(_AbstractDoc2);

var _ParamParser = require('../Parser/ParamParser.js');

var _ParamParser2 = _interopRequireDefault(_ParamParser);

var _NamingUtil = require('../Util/NamingUtil.js');

var _NamingUtil2 = _interopRequireDefault(_NamingUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Doc Class from Function declaration AST node.
 */

var FunctionDoc = function (_AbstractDoc) {
  _inherits(FunctionDoc, _AbstractDoc);

  function FunctionDoc() {
    _classCallCheck(this, FunctionDoc);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FunctionDoc).apply(this, arguments));
  }

  _createClass(FunctionDoc, [{
    key: '@_kind',

    /** specify ``function`` to kind. */
    value: function _kind() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@_kind', this).call(this);
      if (this._value.kind) return;
      this._value.kind = 'function';
    }

    /** take out self name from self node */

  }, {
    key: '@_name',
    value: function _name() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@_name', this).call(this);
      if (this._value.name) return;

      if (this._node.id) {
        this._value.name = this._node.id.name;
      } else {
        this._value.name = _NamingUtil2.default.filePathToName(this._pathResolver.filePath);
      }
    }

    /** take out self name from file path */

  }, {
    key: '@_memberof',
    value: function _memberof() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@_memberof', this).call(this);
      if (this._value.memberof) return;
      this._value.memberof = this._pathResolver.filePath;
    }

    /** check generator property in self node */

  }, {
    key: '@_generator',
    value: function _generator() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@_generator', this).call(this);
      if ('generator' in this._value) return;

      this._value.generator = this._node.generator;
    }

    /** if @param is not exists, guess type of param by using self node. */

  }, {
    key: '@param',
    value: function param() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@param', this).call(this);
      if (this._value.params) return;

      this._value.params = _ParamParser2.default.guessParams(this._node.params);
    }

    /** if @return is not exists, guess type of return by using self node. */

  }, {
    key: '@return',
    value: function _return() {
      _get(Object.getPrototypeOf(FunctionDoc.prototype), '@return', this).call(this);
      if (this._value.return) return;

      var result = _ParamParser2.default.guessReturnParam(this._node.body);
      if (result) {
        this._value.return = result;
      }
    }
  }]);

  return FunctionDoc;
}(_AbstractDoc3.default);

exports.default = FunctionDoc;