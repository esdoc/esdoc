import AbstractDoc from './AbstractDoc.js';

export default class VariableDoc extends AbstractDoc {
  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;

    this._value.kind = 'variable';
  }

  ['@name']() {
    super['@name']();
    if (this._value.name) return;

    this._value.name = this._node.declarations[0].id.name;
  }

  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }
}

