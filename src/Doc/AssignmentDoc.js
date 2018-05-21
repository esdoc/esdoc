import AbstractDoc from './AbstractDoc.js';

/**
 * Doc Class for Assignment AST node.
 */
export default class AssignmentDoc extends AbstractDoc {
  /**
   * specify ``variable`` to kind.
   */
  _$kind() {
    super._$kind();
    this._value.kind = 'variable';
  }

  /**
   * take out self name from self node.
   */
  _$name() {
    super._$name();
    if (!this._value.name) {
      const name = this._flattenMemberExpression(this._node.left).replace(/^this\./, '');
      this._value.name = name;
    }
  }

  /**
   * take out self memberof from file path.
   */
  _$memberof() {
    super._$memberof();
    this._value.memberof = this._pathResolver.filePath;
  }
}

