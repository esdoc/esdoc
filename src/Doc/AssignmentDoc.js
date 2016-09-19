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
    this._value.kind = 'variable';
  }

  /**
   * take out self name from self node.
   */
  ['@_name']() {
    super['@_name']();
    let name = this._flattenMemberExpression(this._node.left).replace(/^this\./, '');
    this._value.name = name;
  }

  /**
   * take out self memberof from file path.
   */
  ['@_memberof']() {
    super['@_memberof']();
    this._value.memberof = this._pathResolver.filePath;
  }
}

