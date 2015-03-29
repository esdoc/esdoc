import AbstractDoc from './AbstractDoc.js';

export default class ClassDoc extends AbstractDoc {
  constructor(...args) {
    super(...args);

    this._apply();
  }

  get kind() {
    return 'class';
  }

  _apply() {
    let node = this._node;

    this._push('@interface', false);

    if (node.superClass) {
      let longname = this._resolveLongname(node.superClass.name);
      this._push('@extends', longname);
    }
  }
}
