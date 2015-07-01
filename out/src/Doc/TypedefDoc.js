'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _colorLogger = require('color-logger');

var _colorLogger2 = _interopRequireDefault(_colorLogger);

var _AbstractDocJs = require('./AbstractDoc.js');

var _AbstractDocJs2 = _interopRequireDefault(_AbstractDocJs);

var _ParserParamParserJs = require('../Parser/ParamParser.js');

var _ParserParamParserJs2 = _interopRequireDefault(_ParserParamParserJs);

var logger = new _colorLogger2['default']('TypedefDoc');

/**
 * Doc class for virtual comment node of typedef.
 */

var TypedefDoc = (function (_AbstractDoc) {
  function TypedefDoc() {
    _classCallCheck(this, TypedefDoc);

    _get(Object.getPrototypeOf(TypedefDoc.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(TypedefDoc, _AbstractDoc);

  _createClass(TypedefDoc, [{
    key: '_apply',

    /**
     * apply own tag.
     * @private
     */
    value: function _apply() {
      _get(Object.getPrototypeOf(TypedefDoc.prototype), '_apply', this).call(this);

      this['@typedef']();

      delete this._value['export'];
      delete this._value.importPath;
      delete this._value.importStyle;
    }
  }, {
    key: '@kind',

    /** specify ``typedef`` to kind. */
    value: function kind() {
      _get(Object.getPrototypeOf(TypedefDoc.prototype), '@kind', this).call(this);
      if (this._value.kind) return;
      this._value.kind = 'typedef';
    }
  }, {
    key: '@name',

    /** set name by using tag. */
    value: function name() {
      var tags = this._findAll(['@name', '@typedef']);
      if (!tags) {
        logger.w('can not resolve name.');
        return;
      }

      var name = undefined;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tag = _step.value;
          var tagName = tag.tagName;
          var tagValue = tag.tagValue;

          if (tagName === '@name') {
            name = tagValue;
          } else if (tagName === '@typedef') {
            var _ParamParser$parseParamValue = _ParserParamParserJs2['default'].parseParamValue(tagValue, true, true, false);

            var typeText = _ParamParser$parseParamValue.typeText;
            var paramName = _ParamParser$parseParamValue.paramName;
            var paramDesc = _ParamParser$parseParamValue.paramDesc;

            name = paramName;
          }
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

      this._value.name = name;
    }
  }, {
    key: '@memberof',

    /** set memberof by using file path. */
    value: function memberof() {
      _get(Object.getPrototypeOf(TypedefDoc.prototype), '@memberof', this).call(this);
      if (this._value.memberof) return;

      var memberof = undefined;
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
  }, {
    key: '@typedef',

    /** for @typedef */
    value: function typedef() {
      var value = this._findTagValue(['@typedef']);
      if (!value) return;

      var _ParamParser$parseParamValue2 = _ParserParamParserJs2['default'].parseParamValue(value, true, true, false);

      var typeText = _ParamParser$parseParamValue2.typeText;
      var paramName = _ParamParser$parseParamValue2.paramName;
      var paramDesc = _ParamParser$parseParamValue2.paramDesc;

      var result = _ParserParamParserJs2['default'].parseParam(typeText, paramName, paramDesc);

      delete result.description;
      delete result.nullable;
      delete result.spread;

      this._value.type = result;
    }
  }]);

  return TypedefDoc;
})(_AbstractDocJs2['default']);

exports['default'] = TypedefDoc;
module.exports = exports['default'];