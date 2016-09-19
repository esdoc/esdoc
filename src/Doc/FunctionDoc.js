import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';
import NamingUtil from '../Util/NamingUtil.js';
import ASTUtil from '../Util/ASTUtil.js';

/**
 * Doc Class from Function declaration AST node.
 */
export default class FunctionDoc extends AbstractDoc {
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
        this._value.name = ASTUtil.flattenMemberExpression(this._node.id);
      } else {
        this._value.name = this._node.id.name;
      }
    } else {
      this._value.name = NamingUtil.filePathToName(this._pathResolver.filePath);
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

  /** if @param is not exists, guess type of param by using self node. */
  _$param() {
    super._$param();
    if (this._value.params) return;

    this._value.params = ParamParser.guessParams(this._node.params);
  }

  /** if @return is not exists, guess type of return by using self node. */
  _$return() {
    super._$return();
    if (this._value.return) return;

    let result = ParamParser.guessReturnParam(this._node.body);
    if (result) {
      this._value.return = result;
    }
  }
}
