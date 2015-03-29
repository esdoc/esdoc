import AbstractDoc from './AbstractDoc.js';
import Logger from '../Util/Logger.js';

export default class ExternalDoc extends AbstractDoc {
  //constructor(ast, node, ...args) {
  //  node.type = 'External';
  //  super(ast, node, ...args);
  //}

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

  //['@static']() {
  //}

  ['@name']() {
    //super['@name']();
    //if (this._value.name) return;
    //
    //let value = this._findTagValue(['@external']);
    //if (value) {
    //  this._value.name = value;
    //}

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

