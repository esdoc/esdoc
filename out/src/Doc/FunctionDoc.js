"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _generator = _interopRequireDefault(require("@babel/generator"));

var _AbstractDoc = _interopRequireDefault(require("./AbstractDoc.js"));

var _NamingUtil = _interopRequireDefault(require("../Util/NamingUtil.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Doc Class from Function declaration AST node.
 */
class FunctionDoc extends _AbstractDoc.default {
  /** specify ``function`` to kind. */
  _$kind() {
    super._$kind();

    this._value.kind = 'function';
  }
  /** take out self name from self node */


  _$name() {
    super._$name();

    if (this._node.id) {
      if (this._node.id.type === 'MemberExpression') {
        // e.g. foo[bar.baz] = function bal(){}
        const expression = (0, _generator.default)(this._node.id).code;
        this._value.name = `[${expression}]`;
      } else {
        this._value.name = this._node.id.name;
      }
    } else {
      this._value.name = _NamingUtil.default.filePathToName(this._pathResolver.filePath);
    }
  }
  /** take out self name from file path */


  _$memberof() {
    super._$memberof();

    this._value.memberof = this._pathResolver.filePath;
  }
  /** check generator property in self node */


  _$generator() {
    super._$generator();

    this._value.generator = this._node.generator;
  }
  /**
   * use async property of self node.
   */


  _$async() {
    super._$async();

    this._value.async = this._node.async;
  }

}

exports.default = FunctionDoc;