import AbstractDoc from './AbstractDoc.js';
import MethodDoc from './MethodDoc.js';
import ParamParser from '../Parser/ParamParser.js'

/**
 * Doc Class from Member Expression AST node.
 */
export default class MemberDoc extends AbstractDoc {
  /**
   * apply own tag.
   * @private
   */
  _apply() {
    super._apply();

    delete this._value.export;
    delete this._value.importPath;
    delete this._value.importStyle;
  }

  /** specify ``member`` to kind. */
  ['@_kind']() {
    super['@_kind']();
    if (this._value.kind) return;
    this._value.kind = 'member';
  }

  /** use static property in class */
  ['@_static']() {
    let tag = this._find(['@_static']);
    if (tag) {
      let value = ['', 'true', true].includes(tag.tagValue);
      this._value.static = value;
      return;
    }

    let parent = this._node.parent;
    while (parent) {
      if (parent.type === 'MethodDefinition') {
        this._value.static = parent.static;
        break;
      }
      parent = parent.parent;
    }
  }

  /** take out self name from self node */
  ['@_name']() {
    let name;
    let tags = this._findAll(['@_name', '@_member']);
    if (tags) {
      for (let tag of tags) {
        let {tagName, tagValue} = tag;
        if (tagName === '@_name') {
          name = tagValue;
        } else if (tagName === '@_member') {
          let {paramName} = ParamParser.parseParamValue(value, true, true, false);
          name = paramName;
        }
      }

    } else {
      let node = this._node;
      name = this._flattenMemberExpression(node.left).replace(/^this\./, '');
    }

    this._value.name = name;
  }

  /** borrow {@link MethodDoc#@_memberof} */
  ['@_memberof']() {
    MethodDoc.prototype['@_memberof'].call(this);
  }

  /** if @type is not exists, guess type by using self node */
  ['@type']() {
    super['@type']();
    if (this._value.type) return;

    this._value.type = ParamParser.guessType(this._node.right);
  }
}
