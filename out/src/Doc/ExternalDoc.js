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

var logger = new _colorLogger2['default']('ExternalDoc');

/**
 * Doc Class from virtual comment node of external.
 */

var ExternalDoc = (function (_AbstractDoc) {
  function ExternalDoc() {
    _classCallCheck(this, ExternalDoc);

    _get(Object.getPrototypeOf(ExternalDoc.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(ExternalDoc, _AbstractDoc);

  _createClass(ExternalDoc, [{
    key: '_apply',

    /**
     * apply own tag.
     * @private
     */
    value: function _apply() {
      _get(Object.getPrototypeOf(ExternalDoc.prototype), '_apply', this).call(this);

      delete this._value['export'];
      delete this._value.importPath;
      delete this._value.importStyle;
    }
  }, {
    key: '@kind',

    /** specify ``external`` to kind. */
    value: function kind() {
      _get(Object.getPrototypeOf(ExternalDoc.prototype), '@kind', this).call(this);
      if (this._value.kind) return;
      this._value.kind = 'external';
    }
  }, {
    key: '@name',

    /** take out self name from tag */
    value: function name() {
      var value = this._findTagValue(['@name', '@external']);
      if (!value) {
        logger.w('can not resolve name.');
      }

      this._value.name = value;

      var tags = this._findAll(['@name', '@external']);
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
          } else if (tagName === '@external') {
            var _ParamParser$parseParamValue = _ParserParamParserJs2['default'].parseParamValue(tagValue, true, false, true);

            var typeText = _ParamParser$parseParamValue.typeText;
            var paramDesc = _ParamParser$parseParamValue.paramDesc;

            name = typeText;
            this._value.externalLink = paramDesc;
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

    /** take out self memberof from file path. */
    value: function memberof() {
      _get(Object.getPrototypeOf(ExternalDoc.prototype), '@memberof', this).call(this);
      if (this._value.memberof) return;
      this._value.memberof = this._pathResolver.filePath;
    }
  }, {
    key: '@longname',

    /** specify name to longname */
    value: function longname() {
      _get(Object.getPrototypeOf(ExternalDoc.prototype), '@longname', this).call(this);
      if (this._value.longname) return;
      this._value.longname = this._value.name;
    }
  }, {
    key: '@external',

    /** for @external */
    value: function external() {}
  }]);

  return ExternalDoc;
})(_AbstractDocJs2['default']);

exports['default'] = ExternalDoc;
module.exports = exports['default'];

// avoid unknown tag.