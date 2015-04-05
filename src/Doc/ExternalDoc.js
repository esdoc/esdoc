import AbstractDoc from './AbstractDoc.js';
import Logger from '../Util/Logger.js';

export default class ExternalDoc extends AbstractDoc {
  _apply() {
    super._apply();

    delete this._value.export;
    delete this._value.importPath;
    delete this._value.importStyle;
  }

  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'external';
  }

  ['@name']() {
    let value = this._findTagValue(['@name', '@external']);
    if (!value) {
      Logger.w(TAG, `can not resolve name.`);
    }

    this._value.name = value;
  }

  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }

  ['@longname']() {
    super['@longname']();
    if (this._value.longname) return;
    this._value.longname = this._value.name;
  }
}

let TAG = ExternalDoc.name;

