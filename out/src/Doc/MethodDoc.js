'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _AbstractDoc2 = require('./AbstractDoc.js');

var _AbstractDoc3 = _interopRequireDefault(_AbstractDoc2);

var _ParamParser = require('../Parser/ParamParser.js');

var _ParamParser2 = _interopRequireDefault(_ParamParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Doc Class from Method Definition AST node.
 */

var MethodDoc = function (_AbstractDoc) {
  _inherits(MethodDoc, _AbstractDoc);

  function MethodDoc() {
    _classCallCheck(this, MethodDoc);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MethodDoc).apply(this, arguments));
  }

  _createClass(MethodDoc, [{
    key: '_apply',

    /**
     * apply own tag.
     * @private
     */
    value: function _apply() {
      _get(Object.getPrototypeOf(MethodDoc.prototype), '_apply', this).call(this);

      delete this._value.export;
      delete this._value.importPath;
      delete this._value.importStyle;
    }

    /** use kind property of self node. */

  }, {
    key: '@_kind',
    value: function _kind() {
      _AbstractDoc3.default.prototype['@_kind'].call(this);
      if (this._value.kind) return;
      this._value.kind = this._node.kind;
    }

    /** take out self name from self node */

  }, {
    key: '@_name',
    value: function _name() {
      _AbstractDoc3.default.prototype['@_name'].call(this);
      if (this._value.name) return;

      // todo: espree parses ``*[foo.bar](){}`` as not computed.
      // so, I hacked ``!this._node.key.name`` condition.
      // this condition is not needed with acorn.
      // see https://github.com/esdoc/esdoc/issues/107
      if (this._node.computed || !this._node.key.name) {
        var result = (0, _babelGenerator2.default)(this._node.key);
        this._value.name = '[' + result.code + ']';
      } else {
        this._value.name = this._node.key.name;
      }
    }

    /** take out memberof from parent class node */

  }, {
    key: '@_memberof',
    value: function _memberof() {
      _AbstractDoc3.default.prototype['@_memberof'].call(this);
      if (this._value.memberof) return;

      var memberof = void 0;
      var parent = this._node.parent;
      while (parent) {
        if (parent.type === 'ClassDeclaration' || parent.type === 'ClassExpression') {
          memberof = this._pathResolver.filePath + '~' + parent.doc.value.name;
          this._value.memberof = memberof;
          return;
        }
        parent = parent.parent;
      }
    }

    /** if @param is not exists, guess type of param by using self node. but ``get`` and ``set`` are not guessed. */

  }, {
    key: '@param',
    value: function param() {
      _get(Object.getPrototypeOf(MethodDoc.prototype), '@param', this).call(this);
      if (this._value.params) return;

      if (['set', 'get'].includes(this._value.kind)) return;

      this._value.params = _ParamParser2.default.guessParams(this._node.params);
    }

    /** if @type is not exists, guess type by using self node. only ``get`` and ``set`` are guess. */

  }, {
    key: '@type',
    value: function type() {
      _get(Object.getPrototypeOf(MethodDoc.prototype), '@type', this).call(this);
      if (this._value.type) return;

      switch (this._value.kind) {
        case 'set':
          this._value.type = _ParamParser2.default.guessType(this._node.right);
          break;
        case 'get':
          var result = _ParamParser2.default.guessReturnParam(this._node.body);
          if (result) this._value.type = result;
          break;
      }
    }

    /** if @return is not exists, guess type of return by usigin self node. but ``constructor``, ``get`` and ``set``are not guessed. */

  }, {
    key: '@return',
    value: function _return() {
      _get(Object.getPrototypeOf(MethodDoc.prototype), '@return', this).call(this);
      if (this._value.return) return;

      if (['constructor', 'set', 'get'].includes(this._value.kind)) return;

      var result = _ParamParser2.default.guessReturnParam(this._node.body);
      if (result) {
        this._value.return = result;
      }
    }

    /** use generator property of self node. */

  }, {
    key: '@_generator',
    value: function _generator() {
      _get(Object.getPrototypeOf(MethodDoc.prototype), '@_generator', this).call(this);
      if ('generator' in this._value) return;

      this._value.generator = this._node.generator;
    }
  }]);

  return MethodDoc;
}(_AbstractDoc3.default);

exports.default = MethodDoc;
module.exports = exports['default'];