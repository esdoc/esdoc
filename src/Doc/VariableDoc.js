import AbstractDoc from './AbstractDoc.js';

export default class VariableDoc extends AbstractDoc {
  get kind() {
    let node = this._node;
    let type = node.type;
    if (type === 'AssignmentExpression') {
      if (node.right.type === 'FunctionExpression') {
        return 'function';
      } else {
        return 'variable';
      }
    } else if (type === 'VariableDeclaration') {
      if (node.declarations[0].init.type === 'FunctionExpression') {
        return 'function';
      } else {
        return 'variable';
      }
    }

    throw new Error('can not resolve kind.');
  }

  get name() {
    let node = this._node;
    let type = node.type;
    if (type === 'AssignmentExpression') {
      return this._flattenMemberExpression(node.left).replace(/^this\./, '');
    } else if (type === 'VariableDeclaration') {
      return this._node.declarations[0].id.name;
    }

    throw new Error('can not resolve name.');
  }
}
