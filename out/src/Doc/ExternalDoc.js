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
 * Doc Class from virtual comment node of external.
 */

var ExternalDoc = function (_AbstractDoc) {
  _inherits(ExternalDoc, _AbstractDoc);

  function ExternalDoc() {
    _classCallCheck(this, ExternalDoc);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ExternalDoc).apply(this, arguments));
  }

  _createClass(ExternalDoc, [{
    key: '_apply',

    /**
     * apply own tag.
     * @private
     */
    value: function _apply() {
      _get(Object.getPrototypeOf(ExternalDoc.prototype), '_apply', this).call(this);

      delete this._value.export;
      delete this._value.importPath;
      delete this._value.importStyle;
    }

    /** specify ``external`` to kind. */

  }, {
    key: '@_kind',
    value: function _kind() {
      _get(Object.getPrototypeOf(ExternalDoc.prototype), '@_kind', this).call(this);
      if (this._value.kind) return;
      this._value.kind = 'external';
    }

    /** take out self name from tag */

  }, {
    key: '@_name',
    value: function _name() {
      var value = this._findTagValue(['@_name', '@external']);
      if (!value) {
        _colorLogger2.default.w('can not resolve name.');
      }

      this._value.name = value;

      var tags = this._findAll(['@_name', '@external']);
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
          } else if (tagName === '@external') {
            var _ParamParser$parsePar = _ParamParser2.default.parseParamValue(tagValue, true, false, true);

            var typeText = _ParamParser$parsePar.typeText;
            var paramDesc = _ParamParser$parsePar.paramDesc;

            name = typeText;
            this._value.externalLink = paramDesc;
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

    /** take out self memberof from file path. */

  }, {
    key: '@_memberof',
    value: function _memberof() {
      _get(Object.getPrototypeOf(ExternalDoc.prototype), '@_memberof', this).call(this);
      if (this._value.memberof) return;
      this._value.memberof = this._pathResolver.filePath;
    }

    /** specify name to longname */

  }, {
    key: '@_longname',
    value: function _longname() {
      _get(Object.getPrototypeOf(ExternalDoc.prototype), '@_longname', this).call(this);
      if (this._value.longname) return;
      this._value.longname = this._value.name;
    }

    /** for @external */

  }, {
    key: '@external',
    value: function external() {
      // avoid unknown tag.
    }
  }]);

  return ExternalDoc;
}(_AbstractDoc3.default);

exports.default = ExternalDoc;