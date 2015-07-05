import Logger from 'color-logger';
import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';

let logger = new Logger('TypedefDoc');

/**
 * Doc class for virtual comment node of typedef.
 */
export default class TypedefDoc extends AbstractDoc {
  /**
   * apply own tag.
   * @private
   */
  _apply() {
    super._apply();

    this['@typedef']();

    delete this._value.export;
    delete this._value.importPath;
    delete this._value.importStyle;
  }

  /** specify ``typedef`` to kind. */
  ['@_kind']() {
    super['@_kind']();
    if (this._value.kind) return;
    this._value.kind = 'typedef';
  }

  /** set name by using tag. */
  ['@_name']() {
    let tags = this._findAll(['@_name', '@typedef']);
    if (!tags) {
      logger.w(`can not resolve name.`);
      return;
    }

    let name;
    for (let tag of tags) {
      let {tagName, tagValue} = tag;
      if (tagName === '@_name') {
        name = tagValue;
      } else if (tagName === '@typedef') {
        let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(tagValue, true, true, false);
        name = paramName;
      }
    }

    this._value.name = name;
  }

  /** set memberof by using file path. */
  ['@_memberof']() {
    super['@_memberof']();
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

  /** for @typedef */
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
