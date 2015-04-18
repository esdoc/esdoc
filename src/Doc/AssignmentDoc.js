import Logger from 'color-logger';
import AbstractDoc from './AbstractDoc.js';

export default class AssignmentDoc extends AbstractDoc {
  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;

    this._value.kind = 'variable';
  }

  ['@name']() {
    super['@name']();
    if (this._value.name) return;

    let name = this._flattenMemberExpression(this._node.left).replace(/^this\./, '');
    this._value.name = name;
  }

  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }
}

