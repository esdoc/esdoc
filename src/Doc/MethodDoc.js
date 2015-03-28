import AbstractDoc from './AbstractDoc.js';

export default class MethodDoc extends AbstractDoc {
  constructor(...args) {
    super(...args);

    this._apply();
  }

  get kind() {
    return this._node.kind;
  }

  get name() {
    return this._node.key.name;
  }

  _apply() {
  }
}
