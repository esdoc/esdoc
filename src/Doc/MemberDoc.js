import AbstractDoc from './AbstractDoc.js';
import assert from 'assert';

export default class MemberDoc extends AbstractDoc {
  get kind() {
    return 'member';
  }

  get name() {
    let node = this._node;
    let name = this._flattenMemberExpression(node.expression.left).replace(/^this\./, '');
    return name;
  }
}
