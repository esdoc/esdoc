import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';

/**
 * Doc Class from Function declaration AST node.
 */
export default class FunctionDoc extends AbstractDoc {
  /** specify ``function`` to kind. */
  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'function';
  }

  /** take out self name from self node */
  ['@name']() {
    super['@name']();
    if (this._value.name) return;
    this._value.name = this._node.id.name;
  }

  /** take out self name from file path */
  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }

  /** check generator property in self node */
  ['@generator']() {
    super['@generator']();
    if ('generator' in this._value) return;

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
