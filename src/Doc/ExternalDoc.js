import Logger from 'color-logger';
import AbstractDoc from './AbstractDoc.js';

let logger = new Logger('ExternalDoc');

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
      logger.w(`can not resolve name.`);
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

