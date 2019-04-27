"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractDoc = _interopRequireDefault(require("./AbstractDoc.js"));

var _MethodDoc = _interopRequireDefault(require("./MethodDoc.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Doc Class from ClassProperty AST node.
 */
class ClassPropertyDoc extends _AbstractDoc.default {
  /**
   * apply own tag.
   * @private
   */
  _apply() {
    super._apply();

    Reflect.deleteProperty(this._value, 'export');
    Reflect.deleteProperty(this._value, 'importPath');
    Reflect.deleteProperty(this._value, 'importStyle');
  }
  /** specify ``member`` to kind. */


  _$kind() {
    super._$kind();

    this._value.kind = 'member';
  }
  /** take out self name from self node */


  _$name() {
    super._$name();

    this._value.name = this._node.key.name;
  }
  /** borrow {@link MethodDoc#@_memberof} */


  _$memberof() {
    Reflect.apply(_MethodDoc.default.prototype._$memberof, this, []);
  }

}

exports.default = ClassPropertyDoc;