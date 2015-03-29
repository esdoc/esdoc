import AbstractDoc from './AbstractDoc.js';
import MethodDoc from './MethodDoc.js';

export default class FunctionDoc extends AbstractDoc {
  _apply() {
    super._apply();

    this['@param']();
    this['@property']();
    this['@return']();
  }

  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'function';
  }

  //['@static']() {
  //  super['@static']();
  //  if ('static' in this._value) return;
  //  this._value.static = true;
  //}

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

  ['@param']() {
    MethodDoc.prototype['@param'].call(this);
  }

  ['@property']() {
    MethodDoc.prototype['@property'].call(this);
  }

  ['@return']() {
    MethodDoc.prototype['@return'].call(this);
  }
}
