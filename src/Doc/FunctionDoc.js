import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';

export default class FunctionDoc extends AbstractDoc {
  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'function';
  }

  ['@name']() {
    super['@name']();
    if (this._value.name) return;
    this._value.name = this._node.id.name;
  }

  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }

  ['@generator']() {
    super['@generator']();
    if ('generator' in this._value) return;

    this._value.generator = this._node.generator;
  }

  ['@param']() {
    super['@param']();
    if (this._value.params) return;

    this._value.params = ParamParser.guessParams(this._node.params);
  }

  ['@return']() {
    super['@return']();
    if (this._value.return) return;

    let result = ParamParser.guessReturnParam(this._node.body);
    if (result) {
      this._value.return = result;
    }
  }
}
