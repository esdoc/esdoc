import AbstractDoc from './AbstractDoc.js';
import assert from 'assert';

export default class MemberDoc extends AbstractDoc {
  constructor(...args) {
    super(...args);

    this._apply();
  }

  get kind() {
    return 'member';
  }

  get name() {
    let node = this._node;
    let name = this._flattenMemberExpression(node.expression.left).replace(/^this\./, '');
    return name;
  }

  _apply() {
  }

  _flattenMemberExpression(node) {
    let results = [];
    let target = node;

    while(target) {
      if (target.type === 'ThisExpression') {
        results.push('this');
        break;
      } else {
        results.push(target.property.name);
        target = target.object;
      }
    }

    return results.reverse().join('.');
  }
}
