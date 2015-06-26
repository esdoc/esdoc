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

/**
 * Doc Class for Assignment AST node.
 */

var AssignmentDoc = (function (_AbstractDoc) {
  function AssignmentDoc() {
    _classCallCheck(this, AssignmentDoc);

    _get(Object.getPrototypeOf(AssignmentDoc.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(AssignmentDoc, _AbstractDoc);

  _createClass(AssignmentDoc, [{
    key: '@kind',

    /**
     * specify ``variable`` to kind.
     */
    value: function kind() {
      _get(Object.getPrototypeOf(AssignmentDoc.prototype), '@kind', this).call(this);
      if (this._value.kind) return;

      this._value.kind = 'variable';
    }
  }, {
    key: '@name',

    /**
     * take out self name from self node.
     */
    value: function name() {
      _get(Object.getPrototypeOf(AssignmentDoc.prototype), '@name', this).call(this);
      if (this._value.name) return;

      var name = this._flattenMemberExpression(this._node.left).replace(/^this\./, '');
      this._value.name = name;
    }
  }, {
    key: '@memberof',

    /**
     * take out self memberof from file path.
     */
    value: function memberof() {
      _get(Object.getPrototypeOf(AssignmentDoc.prototype), '@memberof', this).call(this);
      if (this._value.memberof) return;
      this._value.memberof = this._pathResolver.filePath;
    }
  }]);

  return AssignmentDoc;
})(_AbstractDocJs2['default']);

exports['default'] = AssignmentDoc;
module.exports = exports['default'];