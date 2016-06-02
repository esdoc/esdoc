'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _colorLogger = require('color-logger');

var _colorLogger2 = _interopRequireDefault(_colorLogger);

var _AbstractDoc2 = require('./AbstractDoc.js');

var _AbstractDoc3 = _interopRequireDefault(_AbstractDoc2);

var _ParamParser = require('../Parser/ParamParser.js');

var _ParamParser2 = _interopRequireDefault(_ParamParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Doc class for virtual comment node of typedef.
 */

var TypedefDoc = function (_AbstractDoc) {
  _inherits(TypedefDoc, _AbstractDoc);

  function TypedefDoc() {
    _classCallCheck(this, TypedefDoc);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TypedefDoc).apply(this, arguments));
  }

  _createClass(TypedefDoc, [{
    key: '_apply',

    /**
     * apply own tag.
     * @private
     */
    value: function _apply() {
      _get(Object.getPrototypeOf(TypedefDoc.prototype), '_apply', this).call(this);

      this['@typedef']();

      delete this._value.export;
      delete this._value.importPath;
      delete this._value.importStyle;
    }

    /** specify ``typedef`` to kind. */

  }, {
    key: '@_kind',
    value: function _kind() {
      _get(Object.getPrototypeOf(TypedefDoc.prototype), '@_kind', this).call(this);
      if (this._value.kind) return;
      this._value.kind = 'typedef';
    }

    /** set name by using tag. */

  }, {
    key: '@_name',
    value: function _name() {
      var tags = this._findAll(['@_name', '@typedef']);
      if (!tags) {
        _colorLogger2.default.w('can not resolve name.');
        return;
      }

      var name = void 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tag = _step.value;
          var tagName = tag.tagName;
          var tagValue = tag.tagValue;

          if (tagName === '@_name') {
            name = tagValue;
          } else if (tagName === '@typedef') {
            var _ParamParser$parsePar = _ParamParser2.default.parseParamValue(tagValue, true, true, false);

            var typeText = _ParamParser$parsePar.typeText;
            var paramName = _ParamParser$parsePar.paramName;
            var paramDesc = _ParamParser$parsePar.paramDesc;

            name = paramName;
          }
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

      this._value.name = name;
    }

    /** set memberof by using file path. */

  }, {
    key: '@_memberof',
    value: function _memberof() {
      _get(Object.getPrototypeOf(TypedefDoc.prototype), '@_memberof', this).call(this);
      if (this._value.memberof) return;

      var memberof = void 0;
      var parent = this._node.parent;
      while (parent) {
        if (parent.type === 'ClassDeclaration') {
          memberof = this._pathResolver.filePath + '~' + parent.id.name;
          this._value.memberof = memberof;
          return;
        }
        parent = parent.parent;
      }

      this._value.memberof = this._pathResolver.filePath;
    }

    /** for @typedef */

  }, {
    key: '@typedef',
    value: function typedef() {
      var value = this._findTagValue(['@typedef']);
      if (!value) return;

      var _ParamParser$parsePar2 = _ParamParser2.default.parseParamValue(value, true, true, false);

      var typeText = _ParamParser$parsePar2.typeText;
      var paramName = _ParamParser$parsePar2.paramName;
      var paramDesc = _ParamParser$parsePar2.paramDesc;

      var result = _ParamParser2.default.parseParam(typeText, paramName, paramDesc);

      delete result.description;
      delete result.nullable;
      delete result.spread;

      this._value.type = result;
    }
  }]);

  return TypedefDoc;
}(_AbstractDoc3.default);

exports.default = TypedefDoc;