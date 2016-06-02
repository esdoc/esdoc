'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractDoc2 = require('./AbstractDoc.js');

var _AbstractDoc3 = _interopRequireDefault(_AbstractDoc2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Doc Class for Assignment AST node.
 */

var AssignmentDoc = function (_AbstractDoc) {
  _inherits(AssignmentDoc, _AbstractDoc);

  function AssignmentDoc() {
    _classCallCheck(this, AssignmentDoc);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AssignmentDoc).apply(this, arguments));
  }

  _createClass(AssignmentDoc, [{
    key: '@_kind',

    /**
     * specify ``variable`` to kind.
     */
    value: function _kind() {
      _get(Object.getPrototypeOf(AssignmentDoc.prototype), '@_kind', this).call(this);
      if (this._value.kind) return;

      this._value.kind = 'variable';
    }

    /**
     * take out self name from self node.
     */

  }, {
    key: '@_name',
    value: function _name() {
      _get(Object.getPrototypeOf(AssignmentDoc.prototype), '@_name', this).call(this);
      if (this._value.name) return;

      var name = this._flattenMemberExpression(this._node.left).replace(/^this\./, '');
      this._value.name = name;
    }

    /**
     * take out self memberof from file path.
     */

  }, {
    key: '@_memberof',
    value: function _memberof() {
      _get(Object.getPrototypeOf(AssignmentDoc.prototype), '@_memberof', this).call(this);
      if (this._value.memberof) return;
      this._value.memberof = this._pathResolver.filePath;
    }
  }]);

  return AssignmentDoc;
}(_AbstractDoc3.default);

exports.default = AssignmentDoc;