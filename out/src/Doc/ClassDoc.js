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
 * Doc Class from Class Declaration AST node.
 */

var ClassDoc = (function (_AbstractDoc) {
  function ClassDoc() {
    _classCallCheck(this, ClassDoc);

    _get(Object.getPrototypeOf(ClassDoc.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(ClassDoc, _AbstractDoc);

  _createClass(ClassDoc, [{
    key: '_apply',

    /**
     * apply own tag.
     * @private
     */
    value: function _apply() {
      _get(Object.getPrototypeOf(ClassDoc.prototype), '_apply', this).call(this);

      this['@interface']();
      this['@extends']();
      this['@implements']();
    }
  }, {
    key: '@kind',

    /** specify ``class`` to kind. */
    value: function kind() {
      _get(Object.getPrototypeOf(ClassDoc.prototype), '@kind', this).call(this);
      if (this._value.kind) return;
      this._value.kind = 'class';
    }
  }, {
    key: '@name',

    /** take out self name from self node */
    value: function name() {
      _get(Object.getPrototypeOf(ClassDoc.prototype), '@name', this).call(this);
      if (this._value.name) return;
      this._value.name = this._node.id.name;
    }
  }, {
    key: '@memberof',

    /** take out self memberof from file path. */
    value: function memberof() {
      _get(Object.getPrototypeOf(ClassDoc.prototype), '@memberof', this).call(this);
      if (this._value.memberof) return;
      this._value.memberof = this._pathResolver.filePath;
    }
  }, {
    key: '@interface',

    /** for @interface */
    value: function _interface() {
      var tag = this._find(['@interface']);
      if (tag) {
        this._value['interface'] = ['', 'true', true].includes(tag.tagValue);
      } else {
        this._value['interface'] = false;
      }
    }
  }, {
    key: '@extends',

    /** for @extends, does not need to use this tag. */
    value: function _extends() {
      var values = this._findAllTagValues(['@extends', '@extend']);
      if (values) {
        this._value['extends'] = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            var _ParamParser$parseParamValue = _ParserParamParserJs2['default'].parseParamValue(value, true, false, false);

            var typeText = _ParamParser$parseParamValue.typeText;

            this._value['extends'].push(typeText);
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

        return;
      }

      var node = this._node;
      var longname = undefined;
      if (node.superClass) {
        switch (node.superClass.type) {
          case 'Identifier':
            longname = this._resolveLongname(node.superClass.name);
            this._value['extends'] = [longname];
            break;
          case 'MemberExpression':
            var fullIdentifier = this._flattenMemberExpression(node.superClass);
            var rootIdentifier = fullIdentifier.split('.')[0];
            var rootLongname = this._resolveLongname(rootIdentifier);
            var filePath = rootLongname.replace(/~.*/, '');
            longname = filePath + '~' + fullIdentifier;
            this._value['extends'] = [longname];
            break;
        }
      }
    }
  }, {
    key: '@implements',

    /** for @implements */
    value: function _implements() {
      var values = this._findAllTagValues(['@implements', '@implement']);
      if (!values) return;

      this._value['implements'] = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var value = _step2.value;

          var _ParamParser$parseParamValue2 = _ParserParamParserJs2['default'].parseParamValue(value, true, false, false);

          var typeText = _ParamParser$parseParamValue2.typeText;

          this._value['implements'].push(typeText);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return ClassDoc;
})(_AbstractDocJs2['default']);

exports['default'] = ClassDoc;
module.exports = exports['default'];