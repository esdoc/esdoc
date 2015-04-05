import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';

export default class FunctionDoc extends AbstractDoc {
  _apply() {
    super._apply();

    this['@param']();
    this['@property']();
    this['@return']();
    this['@type']();
    this['@abstract']();
    this['@override']();
    this['@throws']();
    this['@emits']();
    this['@listens']();
  }

  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'function';
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

  ['@param']() {
    let values = this._findAllTagValues(['@param']);
    if (!values) return;

    this._value.params = [];
    for (let value of values) {
      let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
      let result = ParamParser.parseParam(typeText, paramName, paramDesc);
      this._value.params.push(result);
    }
  }

  ['@return']() {
    let value = this._findTagValue(['@return', '@returns']);
    if (!value) return;

    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, false, true);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    this._value.return = result;
  }

  ['@property']() {
    let values = this._findAllTagValues(['@property']);
    if (!values) return;

    this._value.properties = [];
    for (let value of values) {
      let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
      let result = ParamParser.parseParam(typeText, paramName, paramDesc);
      this._value.properties.push(result);
    }
  }

  ['@type']() {
    let value = this._findTagValue(['@type']);
    if (!value) return;

    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, false, false);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    this._value.type = result;
  }

  ['@abstract']() {
    let tag = this._find(['@abstract']);
    if (tag) {
      this._value.abstract = true;
    }
  }

  ['@override'](){
    let tag = this._find(['@override']);
    if (tag) {
      this._value.override = true;
    }
  }

  ['@throws'](){
    let values = this._findAllTagValues(['@throws']);
    if (!values) return;

    this._value.throws = [];
    for (let value of values) {
      let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, false, true);
      let result = ParamParser.parseParam(typeText, paramName, paramDesc);
      this._value.throws.push({
        types: result.types,
        description: result.description
      });
    }
  }

  ['@emits'](){
    let values = this._findAllTagValues(['@emits']);
    if (!values) return;

    this._value.emits = [];
    for (let value of values) {
      let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, false, true);
      let result = ParamParser.parseParam(typeText, paramName, paramDesc);
      this._value.emits.push({
        types: result.types,
        description: result.description
      });
    }
  }

  ['@listens'](){
    let values = this._findAllTagValues(['@listens']);
    if (!values) return;

    this._value.listens = [];
    for (let value of values) {
      let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, false, true);
      let result = ParamParser.parseParam(typeText, paramName, paramDesc);
      this._value.listens.push({
        types: result.types,
        description: result.description
      });
    }
  }
}
