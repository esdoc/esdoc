import Logger from 'color-logger';
import AbstractDoc from './AbstractDoc.js';

/**
 * Doc Class for Assignment AST node.
 */
export default class AssignmentDoc extends AbstractDoc {
  /**
   * specify ``variable`` to kind.
   */
  ['@_kind']() {
    super['@_kind']();
    if (this._value.kind) return;

    this._value.kind = 'variable';
  }

  /**
   * take out self name from self node.
   */
  ['@_name']() {
    super['@_name']();
    if (this._value.name) return;

    let name = this._flattenMemberExpression(this._node.left).replace(/^this\./, '');
    this._value.name = name;
  }

  /**
   * take out self memberof from file path.
   */
  ['@_memberof']() {
    super['@_memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }
}

