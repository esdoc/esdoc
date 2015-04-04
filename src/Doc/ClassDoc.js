import AbstractDoc from './AbstractDoc.js';

export default class ClassDoc extends AbstractDoc {
  _apply() {
    super._apply();

    this['@interface']();
    this['@extends']();
    this['@implements']();
  }

  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'class';
  }

  ['@name']() {
    super['@name']();
    if (this._value.name) return;
    this._value.name = this._node.id.name;
  }

  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }

  ['@interface']() {
    let tag = this._find(['@interface']);
    if (tag) {
      this._value.interface = ['', 'true', true].includes(tag.tagValue);
    } else {
      this._value.interface = false;
    }
  }

  ['@extends']() {
    let values = this._findAllTagValues(['@extends', '@extend']);
    if (values) {
      this._value.extends = values;
      return;
    }

    let node = this._node;
    if (node.superClass) {
      let longname = this._resolveLongname(node.superClass.name);
      this._value.extends = [longname];
    }
  }

  ['@implements'](){
    let values = this._findAllTagValues(['@implements', '@implement']);
    if (values) {
      this._value.implements = values;
    }
  }
}
