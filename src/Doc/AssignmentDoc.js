import Logger from 'color-logger';
import AbstractDoc from './AbstractDoc.js';

/**
 * Doc Class for Assignment ASTNode.
 */
export default class AssignmentDoc extends AbstractDoc {
  /**
   * specify ``variable`` to kind.
   */
  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;

    this._value.kind = 'variable';
  }

  /**
   * take out self name from self node.
   */
  ['@name']() {
    super['@name']();
    if (this._value.name) return;

    let name = this._flattenMemberExpression(this._node.left).replace(/^this\./, '');
    this._value.name = name;
  }

  /**
   * take out self memberof from file path.
   */
  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }
}

