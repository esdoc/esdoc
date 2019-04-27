"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractDoc = _interopRequireDefault(require("./AbstractDoc.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Doc Class from Variable Declaration AST node.
 */
class VariableDoc extends _AbstractDoc.default {
  /** specify ``variable`` to kind. */
  _$kind() {
    super._$kind();

    this._value.kind = 'variable';
  }
  /** set name by using self node. */


  _$name() {
    super._$name();

    const type = this._node.declarations[0].id.type;

    switch (type) {
      case 'Identifier':
        this._value.name = this._node.declarations[0].id.name;
        break;

      case 'ObjectPattern':
        // TODO: optimize for multi variables.
        // e.g. export const {a, b} = obj
        this._value.name = this._node.declarations[0].id.properties[0].key.name;
        break;

      case 'ArrayPattern':
        // TODO: optimize for multi variables.
        // e.g. export cont [a, b] = arr
        this._value.name = this._node.declarations[0].id.elements.find(v => v).name;
        break;

      default:
        throw new Error(`unknown declarations type: ${type}`);
    }
  }
  /** set memberof by using file path. */


  _$memberof() {
    super._$memberof();

    this._value.memberof = this._pathResolver.filePath;
  }

}

exports.default = VariableDoc;