import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js'
import ASTUtil from '../Util/ASTUtil.js';

/**
 * Doc Class from Variable Declaration AST node.
 */
export default class VariableDoc extends AbstractDoc {
  /** specify ``variable`` to kind. */
  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;

    this._value.kind = 'variable';
  }

  /** set name by using self node. */
  ['@name']() {
    super['@name']();
    if (this._value.name) return;

    this._value.name = this._node.declarations[0].id.name;
  }

  /** set memberof by using file path. */
  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }

  /** if @type is not exists, guess type by using self node. */
  ['@type']() {
    super['@type']();
    if (this._value.type) return;

    if (this._node.declarations[0].init.type === 'NewExpression') {
      let className = this._node.declarations[0].init.callee.name;
      let longname = this._findClassLongname(className);
      this._value.type = {types: [longname]};
    } else {
      this._value.type = ParamParser.guessType(this._node.declarations[0].init);
    }
  }
}

