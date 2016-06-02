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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Doc Class from test code file.
 */

var TestDoc = function (_AbstractDoc) {
  _inherits(TestDoc, _AbstractDoc);

  function TestDoc() {
    _classCallCheck(this, TestDoc);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TestDoc).apply(this, arguments));
  }

  _createClass(TestDoc, [{
    key: '_apply',

    /**
     * apply own tag.
     * @private
     */
    value: function _apply() {
      _get(Object.getPrototypeOf(TestDoc.prototype), '_apply', this).call(this);

      this['@testTarget']();

      delete this._value.export;
      delete this._value.importPath;
      delete this._value.importStyle;
    }

    /** use name property of self node. */

  }, {
    key: '@_kind',
    value: function _kind() {
      _get(Object.getPrototypeOf(TestDoc.prototype), '@_kind', this).call(this);
      if (this._value.kind) return;

      switch (this._node.callee.name) {
        case 'suite': //fall
        case 'context': // fall
        case 'describe':
          this._value.kind = 'testDescribe';
          break;
        case 'test': // fall
        case 'it':
          this._value.kind = 'testIt';
          break;
        default:
          throw new Error('unknown name. node.callee.name = ' + this._node.callee.name);
      }
    }

    /** set name and testId from special esdoc property. */

  }, {
    key: '@_name',
    value: function _name() {
      _get(Object.getPrototypeOf(TestDoc.prototype), '@_name', this).call(this);
      if (this._value.name) return;

      this._value.name = this._node._esdocTestName;
      this._value.testId = this._node._esdocTestId;
    }

    /** set memberof to use parent test nod and file path. */

  }, {
    key: '@_memberof',
    value: function _memberof() {
      _get(Object.getPrototypeOf(TestDoc.prototype), '@_memberof', this).call(this);
      if (this._value.memberof) return;

      var chain = [];
      var parent = this._node.parent;
      while (parent) {
        if (parent._esdocTestName) chain.push(parent._esdocTestName);
        parent = parent.parent;
      }

      var filePath = this._pathResolver.filePath;

      if (chain.length) {
        this._value.memberof = filePath + '~' + chain.reverse().join('.');
        this._value.testDepth = chain.length;
      } else {
        this._value.memberof = filePath;
        this._value.testDepth = 0;
      }
    }

    /** set describe by using test node arguments. */

  }, {
    key: '@desc',
    value: function desc() {
      _get(Object.getPrototypeOf(TestDoc.prototype), '@desc', this).call(this);
      if (this._value.description) return;

      this._value.description = this._node.arguments[0].value;
    }

    /** for @testTarget. */

  }, {
    key: '@testTarget',
    value: function testTarget() {
      var values = this._findAllTagValues(['@test', '@testTarget']);
      if (!values) return;

      this._value.testTargets = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          var _ParamParser$parsePar = _ParamParser2.default.parseParamValue(value, true, false, false);

          var typeText = _ParamParser$parsePar.typeText;

          this._value.testTargets.push(typeText);
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
    }
  }]);

  return TestDoc;
}(_AbstractDoc3.default);

exports.default = TestDoc;