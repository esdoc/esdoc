import AbstractDoc from './AbstractDoc.js';
//import ParamParser from '../Parser/ParamParser.js';

export default class FunctionDoc extends AbstractDoc {
  //_apply() {
  //  super._apply();
  //
  //}

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

}
