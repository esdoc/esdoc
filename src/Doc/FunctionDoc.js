import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';
import NamingUtil from '../Util/NamingUtil.js';
import ASTUtil from '../Util/ASTUtil.js';

/**
 * Doc Class from Function declaration AST node.
 */
export default class FunctionDoc extends AbstractDoc {
  /** specify ``function`` to kind. */
  ['@_kind']() {
    super['@_kind']();
    this._value.kind = 'function';
  }

  /** take out self name from self node */
  ['@_name']() {
    super['@_name']();

    if (this._node.id) {
      if (this._node.id.type === 'MemberExpression') {
        this._value.name = ASTUtil.flattenMemberExpression(this._node.id);
      } else {
        this._value.name = this._node.id.name;
      }
    } else {
      this._value.name = NamingUtil.filePathToName(this._pathResolver.filePath);
    }
  }

  /** take out self name from file path */
  ['@_memberof']() {
    super['@_memberof']();
    this._value.memberof = this._pathResolver.filePath;
  }

  /** check generator property in self node */
  ['@_generator']() {
    super['@_generator']();
    this._value.generator = this._node.generator;
  }

  /** if @param is not exists, guess type of param by using self node. */
  ['@param']() {
    super['@param']();
    if (this._value.params) return;

    this._value.params = ParamParser.guessParams(this._node.params);
  }

  /** if @return is not exists, guess type of return by using self node. */
  ['@return']() {
    super['@return']();
    if (this._value.return) return;

    let result = ParamParser.guessReturnParam(this._node.body);
    if (result) {
      this._value.return = result;
    }
  }
}
