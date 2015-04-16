import assert from 'assert';
import fs from 'fs';
import ParamParser from '../Parser/ParamParser.js';
import ASTUtil from '../Util/ASTUtil.js';

export default class AbstractDoc {
  constructor(ast, node, pathResolver, commentTags = []){
    this._ast = ast;
    this._node = node;
    this._pathResolver = pathResolver;
    this._commentTags = commentTags;
    this._value = {};

    this._apply();
  }

  get value() {
    return JSON.parse(JSON.stringify(this._value));
  }

  _apply() {
    this['@kind']();
    this['@static']();
    this['@variation']();
    this['@name']();
    this['@memberof']();
    this['@longname']();
    this['@access']();
    this['@export']();
    this['@importPath']();
    this['@importStyle']();
    this['@desc']();
    this['@example']();
    this['@see']();
    this['@lineNumber']();
    this['@deprecated']();
    this['@experimental']();
    this['@since']();
    this['@version']();
    this['@todo']();
    this['@ignore']();

    this['@param']();
    this['@property']();
    this['@return']();
    this['@type']();
    this['@abstract']();
    this['@override']();
    this['@throws']();
    this['@emits']();
    this['@listens']();
    this['@member']();
    this['@content']();
    this['@generator']();
  }

  ['@kind']() {
    this._value.kind = this._findTagValue(['@kind']);
  }

  ['@static']() {
    let tag = this._find(['@static']);
    if (tag) {
      if (tag.tagValue === '' || tag.tagValue === 'true') {
        this._value.static = true;
      } else {
        this._value.static = false;
      }
    } else {
      if ('static' in this._node) {
        this._value.static = this._node.static;
      } else {
        this._value.static = true;
      }
    }
  }

  ['@variation']() {
    this._value.variation = this._findTagValue(['@variation']);
  }

  ['@name']() {
    this._value.name = this._findTagValue(['@name']);
  }

  ['@memberof']() {
    this._value.memberof = this._findTagValue(['@memberof']);
  }

  ['@longname']() {
    let tag = this._find(['@longname']);
    if (tag) {
      this._value.longname = tag.tagValue;
    } else {
      let memberof = this._value.memberof;
      let name = this._value.name;
      let scope = this._value.static ? '.' : '#';
      if (memberof.includes('~')) {
        this._value.longname = `${memberof}${scope}${name}`;
      } else {
        this._value.longname = `${memberof}~${name}`;
      }
    }
  }

  ['@access']() {
    let tag = this._find(['@access', '@public', '@private', '@protected']);
    if (tag) {
      let access;
      switch (tag.tagName) {
        case '@access': access = tag.tagValue; break;
        case '@public': access = 'public'; break;
        case '@protected': access = 'protected'; break;
        case '@private': access = 'private'; break;
      }

      this._value.access = access;
    } else {
      this._value.access = null;
    }
  }

  ['@export']() {
    let tag = this._find(['@export']);
    if (tag) {
      if (tag.tagValue === '' || tag.tagValue === 'true') {
        this._value.export = true;
      } else {
        this._value.export = false;
      }
      return;
    }

    let parent = this._node.parent;
    while (parent) {
      if (parent.type === 'ExportDefaultDeclaration') {
        this._value.export = true;
        return;
      } else if (parent.type === 'ExportNamedDeclaration') {
        this._value.export = true;
        return;
      }

      parent = parent.parent;
    }

    this._value.export = false;
  }

  ['@importPath']() {
    let tag = this._find(['@importPath']);
    if (tag) {
      this._value.importPath = tag.tagValue;
    } else {
      this._value.importPath = this._pathResolver.importPath;
    }
  }

  ['@importStyle']() {
    let tag = this._find(['@importStyle']);
    if (tag) {
      this._value.importStyle = tag.tagValue;
      return;
    }

    let parent = this._node.parent;
    let name = this._value.name;
    while (parent) {
      if (parent.type === 'ExportDefaultDeclaration') {
        this._value.importStyle = name;
        return;
      } else if (parent.type === 'ExportNamedDeclaration') {
        this._value.importStyle = `{${name}}`;
        return;
      }
      parent = parent.parent;
    }

    this._value.importStyle = null;
  }

  ['@desc']() {
    this._value.description = this._findTagValue(['@desc']);
  }

  ['@example']() {
    let tags = this._findAll(['@example']);
    if (!tags) return;
    if (!tags.length) return;

    this._value.examples = [];
    for (let tag of tags) {
      this._value.examples.push(tag.tagValue);
    }
  }

  ['@see']() {
    let tags = this._findAll(['@see']);
    if (!tags) return;
    if (!tags.length) return;

    this._value.see = [];
    for (let tag of tags) {
      this._value.see.push(tag.tagValue);
    }
  }

  ["@lineNumber"]() {
    let tag = this._find(['@lineNumber']);
    if (tag) {
      this._value.lineNumber = tag.tagValue;
      return;
    }

    let node = this._node;
    if (node.loc) {
      this._value.lineNumber = node.loc.start.line;
    }
  }

  ['@deprecated']() {
    let tag = this._find(['@deprecated']);
    if (tag) {
      if (tag.tagValue) {
        this._value.deprecated = tag.tagValue;
      } else {
        this._value.deprecated = true;
      }
    }
  }

  ['@experimental'](){
    let tag = this._find(['@experimental']);
    if (tag) {
      if (tag.tagValue) {
        this._value.experimental = tag.tagValue;
      } else {
        this._value.experimental = true;
      }
    }
  }

  ['@since'](){
    let tag = this._find(['@since']);
    if (tag) {
      this._value.since = tag.tagValue;
    }
  }

  ['@version'](){
    let tag = this._find(['@version']);
    if (tag) {
      this._value.version = tag.tagValue;
    }
  }

  ['@todo'](){
    let tags = this._findAll(['@todo']);
    if (tags) {
      this._value.todo = [];
      for (let tag of tags) {
        this._value.todo.push(tag.tagValue);
      }
    }
  }

  ['@ignore'](){
    let tag = this._find(['@ignore']);
    if (tag) {
      this._value.ignore = true;
    }
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

  ['@member']() {
    let value = this._findTagValue(['@member']);
    if (!value) return;

    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, true, false);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    this._value.type = result;
  }

  ['@content']() {
    let value = this._findTagValue(['@content']);
    if (value) {
      this._value.content = value;
    }
  }

  ['@generator']() {
    let tag = this._find(['@generator']);
    if (tag) {
      this._value.generator = true;
    }
  }

  _findAll(names) {
    let results = [];
    for (let tag of this._commentTags) {
      if (names.includes(tag.tagName)) results.push(tag);
    }

    if (results.length) {
      return results;
    } else {
      return null;
    }
  }

  _find(names) {
    let results = this._findAll(names);
    if (results && results.length) {
      return results[results.length - 1];
    } else {
      return null;
    }
  }

  _findAllTagValues(names) {
    let tags = this._findAll(names);
    if (!tags) return;

    let results = [];
    for (let tag of tags) {
      results.push(tag.tagValue);
    }

    return results;
  }

  _findTagValue(names) {
    let tag = this._find(names);
    if (tag) {
      return tag.tagValue;
    } else {
      return null;
    }
  }

  _resolveLongname(name) {
    let importPath = ASTUtil.findPathInImportDeclaration(this._ast, name);
    if (importPath) {
      let resolvedPath = this._pathResolver.resolve(importPath);
      let longname = `${resolvedPath}~${name}`;
      return longname;
    }

    return name;
  }

  _flattenMemberExpression(node) {
    let results = [];
    let target = node;

    while(target) {
      if (target.type === 'ThisExpression') {
        results.push('this');
        break;
      } else if (target.type === 'Identifier') {
        results.push(target.name);
        break;
      } else {
        results.push(target.property.name);
        target = target.object;
      }
    }

    return results.reverse().join('.');
  }
}
