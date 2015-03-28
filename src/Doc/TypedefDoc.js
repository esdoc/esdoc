import AbstractDoc from './AbstractDoc.js';

export default class TypedefDoc extends AbstractDoc {
  constructor(...args) {
    super(...args);
    this._apply();
  }

  get kind() {
    return 'typedef';
  }

  get name() {
    return null;
  }

  _apply() {
  }
}
