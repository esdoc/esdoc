import AbstractDoc from './AbstractDoc.js';

export default class FunctionDoc extends AbstractDoc {
  get kind() {
    return 'function';
  }

  get name() {
    return this._node.id.name;
  }
}
