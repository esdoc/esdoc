import fs from 'fs';
import AbstractDoc from './AbstractDoc.js';

export default class FileDoc extends AbstractDoc {
  _apply() {
    super._apply();

    //this['@content']();

    delete this._value.export;
    delete this._value.importPath;
    delete this._value.importStyle;
  }

  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'file';
  }

  ['@name']() {
    super['@name']();
    if (this._value.name) return;
    this._value.name = this._pathResolver.filePath;
  }

  ['@longname']() {
    let value = this._findTagValue(['@longname']);
    if (value) {
      this._value.longname = value;
    } else {
      this._value.longname = this._value.name;
    }
  }

  ['@content']() {
    super['@content']();
    if ('content' in this._value) return;

    let filePath = this._pathResolver.fileFullPath;
    let content = fs.readFileSync(filePath, {encode: 'utf8'}).toString();
    this._value.content = content;
  }
}
