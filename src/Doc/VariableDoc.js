import AbstractDoc from './AbstractDoc.js';
import MemberDoc from './MemberDoc.js';
import FunctionDoc from './FunctionDoc.js';
import Logger from '../Util/Logger.js';

export default class VariableDoc extends AbstractDoc {
  _apply() {
    super._apply();

    //this['@property']();
    //this['@type']();

    //if (this._value.kind === 'function') {
    //  FunctionDoc.prototype['@param'].call(this);
    //  FunctionDoc.prototype['@return'].call(this);
    //}
  }

  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;

    let node = this._node;
    let type = node.type;
    if (type === 'AssignmentExpression') {
      if (node.right.type === 'FunctionExpression') {
        this._value.kind = 'function';
        return;
      } else {
        this._value.kind = 'variable';
        return;
      }
    } else if (type === 'VariableDeclaration') {
      if (node.declarations[0].init.type === 'FunctionExpression') {
        this._value.kind = 'function';
        return;
      } else {
        this._value.kind = 'variable';
        return;
      }
    }

    Logger.w(TAG, `can not resolve kind.`);
  }

  ['@name']() {
    super['@name']();
    if (this._value.name) return;

    let node = this._node;
    let type = node.type;
    if (type === 'AssignmentExpression') {
      let name = this._flattenMemberExpression(node.left).replace(/^this\./, '');
      this._value.name = name;
      return;
    } else if (type === 'VariableDeclaration') {
      this._value.name = node.declarations[0].id.name;
      return;
    }

    Logger.w(TAG, `can not resolve name.`);
  }

  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }
  //
  //['@property']() {
  //  MemberDoc.prototype['@property'].call(this);
  //}
  //
  //['@type']() {
  //  MemberDoc.prototype['@type'].call(this);
  //}
}

let TAG = VariableDoc.name;

