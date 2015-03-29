import AbstractDoc from './AbstractDoc.js';
import MethodDoc from './MethodDoc.js';
import ParamParser from '../Parser/ParamParser.js';
import Logger from '../Util/Logger.js';

export default class MemberDoc extends AbstractDoc {
  _apply() {
    super._apply();

    this['@property']();
    this['@type']();
    this['@member']();

    delete this._value.export;
    delete this._value.importPath;
    delete this._value.importStyle;
  }

  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'member';
  }

  ['@static']() {
    //super['@static']();
    //if ('static' in this._value.static) return;

    let tag = this._find(['@static']);
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

  ['@name']() {
    //super['@name']();
    //if (this._value.name) return;
    //
    //let node = this._node;
    //let name = this._flattenMemberExpression(node.expression.left).replace(/^this\./, '');
    //this._value.name = name;

    let name;
    let tags = this._findAll(['@name', '@member']);
    if (tags) {
      for (let tag of tags) {
        let {tagName, tagValue} = tag;
        if (tagName === '@name') {
          name = tagValue;
        } else if (tagName === '@member') {
          let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, true, false);
          name = paramName;
        }
      }

    } else {
      let node = this._node;
      name = this._flattenMemberExpression(node.expression.left).replace(/^this\./, '');
    }

    this._value.name = name;
  }

  ['@memberof']() {
    MethodDoc.prototype['@memberof'].call(this);
    //super['@memberof']();
    //if (this._value.memberof) return;
    //
    //let parent = this._node.parent;
    //while (parent) {
    //  if (parent.type === 'ClassDeclaration') {
    //    let memberof = `${this._pathResolver.filePath}~${parent.id.name}`;
    //    this._value.memberof = memberof;
    //    break;
    //  }
    //  parent = parent.parent;
    //}
  }

  ['@property']() {
    MethodDoc.prototype['@property'].call(this);
  }

  ['@type']() {
    MethodDoc.prototype['@type'].call(this);
  }

  ['@member']() {
    let value = this._findTagValue(['@member']);
    if (!value) return;

    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, true, false);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    this._value.type = result;
  }
}

let TAG = MemberDoc.name;

