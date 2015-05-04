import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';

export default class MethodDoc extends AbstractDoc {
  _apply() {
    super._apply();

    delete this._value.export;
    delete this._value.importPath;
    delete this._value.importStyle;
  }

  ['@kind']() {
    AbstractDoc.prototype['@kind'].call(this);
    if (this._value.kind) return;
    this._value.kind = this._node.kind;
  }

  ['@name']() {
    AbstractDoc.prototype['@name'].call(this);
    if (this._value.name) return;

    // normally `key.name`, but computed value(aka ['foo']) refers `key.value`.
    this._value.name = this._node.key.name || this._node.key.value;
  }

  ['@memberof']() {
    AbstractDoc.prototype['@memberof'].call(this);
    if (this._value.memberof) return;

    let memberof;
    let parent = this._node.parent;
    while (parent) {
      if (parent.type === 'ClassDeclaration' || parent.type === 'ClassExpression') {
        memberof = `${this._pathResolver.filePath}~${parent.id.name}`;
        this._value.memberof = memberof;
        return;
      }
      parent = parent.parent;
    }
  }

  ['@param']() {
    super['@param']();
    if (this._value.params) return;

    if (['set', 'get'].includes(this._value.kind)) return;

    this._value.params = ParamParser.guessParams(this._node.value.params);
  }

  ['@type']() {
    super['@type']();
    if (this._value.type) return;

    switch (this._value.kind) {
      case 'set':
        this._value.type = ParamParser.guessType(this._node.right);
        break;
      case 'get':
        let result = ParamParser.guessReturnParam(this._node.value.body);
        if (result) this._value.type = result;
        break;
    }
  }

  ['@return']() {
    super['@return']();
    if (this._value.return) return;

    if (['set', 'get'].includes(this._value.kind)) return;

    let result = ParamParser.guessReturnParam(this._node.value.body);
    if (result) {
      this._value.return = result;
    }
  }

  ['@generator']() {
    super['@generator']();
    if ('generator' in this._value) return;

    this._value.generator = this._node.value.generator;
  }
}
