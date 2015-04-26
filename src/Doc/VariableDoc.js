import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js'

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

  ['@type']() {
    super['@type']();
    if (this._value.type) return;

    this._value.type = ParamParser.guessType(this._node.declarations[0].init);
  }
}

