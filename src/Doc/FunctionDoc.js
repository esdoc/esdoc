import AbstractDoc from './AbstractDoc.js';

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
}
