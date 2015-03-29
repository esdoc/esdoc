import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';
import Logger from '../Util/Logger.js';

export default class TypedefDoc extends AbstractDoc {
  _apply() {
    super._apply();

    this['@typedef']();
  }

  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'typedef';
  }

  ['@name']() {
    let tags = this._findAll(['@name', '@typedef']);
    if (!tags) {
      Logger.w(TAG, `can not resolve name.`);
      return;
    }

    let name;
    for (let tag of tags) {
      let {tagName, tagValue} = tag;
      if (tagName === '@name') {
        name = tagValue;
      } else if (tagName === '@typedef') {
        let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(tagValue, true, true, false);
        name = paramName;
      }
    }

    this._value.name = name;
  }

  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;

    let memberof;
    let parent = this._node.parent;
    while (parent) {
      if (parent.type === 'ClassDeclaration') {
        memberof = `${this._pathResolver.filePath}~${parent.id.name}`;
        this._value.memberof = memberof;
        return;
      }
      parent = parent.parent;
    }

    this._value.memberof = this._pathResolver.filePath;
  }

  ['@typedef']() {
    let value = this._findTagValue(['@typedef']);
    if (!value) return;

    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, true, false);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);

    delete result.description;
    delete result.nullable;
    delete result.spread;

    this._value.type = result;
  }
}

let TAG = TypedefDoc.name;
