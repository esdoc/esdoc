import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';

/**
 * Doc Class from Class Declaration AST node.
 */
export default class ClassDoc extends AbstractDoc {
  /**
   * apply own tag.
   * @private
   */
  _apply() {
    super._apply();

    this['@interface']();
    this['@extends']();
    this['@implements']();
  }

  /** specify ``class`` to kind. */
  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'class';
  }

  /** take out self name from self node */
  ['@name']() {
    super['@name']();
    if (this._value.name) return;
    this._value.name = this._node.id.name;
  }

  /** take out self memberof from file path. */
  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }

  /** for @interface */
  ['@interface']() {
    let tag = this._find(['@interface']);
    if (tag) {
      this._value.interface = ['', 'true', true].includes(tag.tagValue);
    } else {
      this._value.interface = false;
    }
  }

  /** for @extends, does not need to use this tag. */
  ['@extends']() {
    let values = this._findAllTagValues(['@extends', '@extend']);
    if (values) {
      this._value.extends = [];
      for (let value of values) {
        let {typeText} = ParamParser.parseParamValue(value, true, false, false);
        this._value.extends.push(typeText);
      }
      return;
    }

    let node = this._node;
    let longname;
    if (node.superClass) {
      switch (node.superClass.type) {
        case 'Identifier':
          longname = this._resolveLongname(node.superClass.name);
          this._value.extends = [longname];
          break;
        case 'MemberExpression':
          let fullIdentifier = this._flattenMemberExpression(node.superClass);
          let rootIdentifier = fullIdentifier.split('.')[0];
          let rootLongname = this._resolveLongname(rootIdentifier);
          let filePath = rootLongname.replace(/~.*/, '');
          longname = `${filePath}~${fullIdentifier}`;
          this._value.extends = [longname];
          break;
      }
    }
  }

  /** for @implements */
  ['@implements'](){
    let values = this._findAllTagValues(['@implements', '@implement']);
    if (!values) return;

    this._value.implements = [];
    for (let value of values) {
      let {typeText} = ParamParser.parseParamValue(value, true, false, false);
      this._value.implements.push(typeText);
    }
  }
}
