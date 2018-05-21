import AbstractDoc from './AbstractDoc.js';
import babelGenerator from 'babel-generator';

/**
 * Doc Class from Method Definition AST node.
 */
export default class MethodDoc extends AbstractDoc {
  /**
   * apply own tag.
   * @private
   */
  _apply() {
    super._apply();

    Reflect.deleteProperty(this._value, 'export');
    Reflect.deleteProperty(this._value, 'importPath');
    Reflect.deleteProperty(this._value, 'importStyle');
  }

  /** use kind property of self node. */
  _$kind() {
    super._$kind();
    this._value.kind = this._node.kind;
  }

  /** take out self name from self node */
  _$name() {
    super._$name();
    if (!this._value.name) {
      if (this._node.computed) {
        const expression = babelGenerator(this._node.key).code;
        this._value.name = `[${expression}]`;
      } else {
        this._value.name = this._node.key.name;
      }
    }
  }

  /** take out memberof from parent class node */
  _$memberof() {
    super._$memberof();

    let memberof;
    let parent = this._node.parent;
    while (parent) {
      if (parent.type === 'ClassDeclaration' || parent.type === 'ClassExpression') {
        memberof = `${this._pathResolver.filePath}~${parent.doc.value.name}`;
        this._value.memberof = memberof;
        return;
      }
      parent = parent.parent;
    }
  }

  /** use generator property of self node. */
  _$generator() {
    super._$generator();

    this._value.generator = this._node.generator;
  }

  /**
   * use async property of self node.
   */
  _$async() {
    super._$async();

    this._value.async = this._node.async;
  }
}
