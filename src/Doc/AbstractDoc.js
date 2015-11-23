import assert from 'assert';
import fs from 'fs';
import path from 'path';
import ParamParser from '../Parser/ParamParser.js';
import ASTUtil from '../Util/ASTUtil.js';
import InvalidCodeLogger from '../Util/InvalidCodeLogger.js';
import ASTNodeContainer from '../Util/ASTNodeContainer.js';

/**
 * Abstract Doc Class.
 * @todo rename this class name.
 */
export default class AbstractDoc {
  /**
   * create instance.
   * @param {AST} ast - this is AST that contains this doc.
   * @param {ASTNode} node - this is self node.
   * @param {PathResolver} pathResolver - this is file path resolver that contains this doc.
   * @param {Tag[]} commentTags - this is tags that self node has.
   */
  constructor(ast, node, pathResolver, commentTags = []){
    this._ast = ast;
    this._node = node;
    this._pathResolver = pathResolver;
    this._commentTags = commentTags;
    this._value = {};

    Object.defineProperty(this._node, 'doc', {value: this});

    this._value.__docId__ = ASTNodeContainer.addNode(node);

    this._apply();
  }

  /** @type {DocObject[]} */
  get value() {
    return JSON.parse(JSON.stringify(this._value));
  }

  /**
   * apply doc comment.
   * @private
   */
  _apply() {
    this['@_kind']();
    this['@_static']();
    this['@_variation']();
    this['@_name']();
    this['@_memberof']();
    this['@_longname']();
    this['@access']();
    this['@_export']();
    this['@_importPath']();
    this['@_importStyle']();
    this['@desc']();
    this['@example']();
    this['@see']();
    this['@_lineNumber']();
    this['@deprecated']();
    this['@experimental']();
    this['@since']();
    this['@version']();
    this['@todo']();
    this['@ignore']();
    this['@_pseudoExport']();
    this['@_undocument']();
    this['@_unknown']();

    this['@param']();
    this['@property']();
    this['@return']();
    this['@type']();
    this['@abstract']();
    this['@override']();
    this['@throws']();
    this['@emits']();
    this['@listens']();
    this['@_member']();
    this['@_content']();
    this['@_generator']();
  }

  /** for @_kind, does not need to use this tag */
  ['@_kind']() {
    this._value.kind = this._findTagValue(['@_kind']);
  }

  /** for @_static, does not need to use this tag */
  ['@_static']() {
    let tag = this._find(['@_static']);
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

  /** for @_variation */
  ['@_variation']() {
    this._value.variation = this._findTagValue(['@_variation']);
  }

  /** for @_name, does not need to use this tag */
  ['@_name']() {
    this._value.name = this._findTagValue(['@_name']);
  }

  /** for @_memberof, does not need to use this tag */
  ['@_memberof']() {
    this._value.memberof = this._findTagValue(['@_memberof']);
  }

  /** for @_longname, does not need to use this tag */
  ['@_longname']() {
    let tag = this._find(['@_longname']);
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

  /** for @access, @public, @private, @protected */
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

  /** for @public */
  ['@public'](){
    // avoid unknown tag.
  }

  /** for @protected */
  ['@protected']() {
    // avoid unknown tag.
  }

  /** for @private */
  ['@private']() {
    // avoid unknown tag.
  }

  /** for @_export, does not need to use this tag */
  ['@_export']() {
    let tag = this._find(['@_export']);
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

  /** for @_importPath, does not need to use this tag */
  ['@_importPath']() {
    let tag = this._find(['@_importPath']);
    if (tag) {
      this._value.importPath = tag.tagValue;
    } else {
      this._value.importPath = this._pathResolver.importPath;
    }
  }

  /** for @_importStyle, does not need to use this tag */
  ['@_importStyle']() {
    let tag = this._find(['@_importStyle']);
    if (tag) {
      this._value.importStyle = tag.tagValue;
      return;
    }

    if (this._node.__esdoc__pseudo_export) {
      this._value.importStyle = null;
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

  /** for @desc */
  ['@desc']() {
    this._value.description = this._findTagValue(['@desc']);
  }

  /** for @example. possible multi tag. */
  ['@example']() {
    let tags = this._findAll(['@example']);
    if (!tags) return;
    if (!tags.length) return;

    this._value.examples = [];
    for (let tag of tags) {
      this._value.examples.push(tag.tagValue);
    }
  }

  /** for @see. possible multi tag. */
  ['@see']() {
    let tags = this._findAll(['@see']);
    if (!tags) return;
    if (!tags.length) return;

    this._value.see = [];
    for (let tag of tags) {
      this._value.see.push(tag.tagValue);
    }
  }

  /** for @_lineNumber, does not need to use this tag */
  ["@_lineNumber"]() {
    let tag = this._find(['@_lineNumber']);
    if (tag) {
      this._value.lineNumber = tag.tagValue;
      return;
    }

    let node = this._node;
    if (node.loc) {
      this._value.lineNumber = node.loc.start.line;
    }
  }

  /** for @deprecated */
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

  /** for @experimental */
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

  /** for @since */
  ['@since'](){
    let tag = this._find(['@since']);
    if (tag) {
      this._value.since = tag.tagValue;
    }
  }

  /** for @version */
  ['@version'](){
    let tag = this._find(['@version']);
    if (tag) {
      this._value.version = tag.tagValue;
    }
  }

  /** for @todo. possible multi tag. */
  ['@todo'](){
    let tags = this._findAll(['@todo']);
    if (tags) {
      this._value.todo = [];
      for (let tag of tags) {
        this._value.todo.push(tag.tagValue);
      }
    }
  }

  /** for @ignore. */
  ['@ignore'](){
    let tag = this._find(['@ignore']);
    if (tag) {
      this._value.ignore = true;
    }
  }

  /** for @_pseudoExport, does not need to use this tag. */
  ['@_pseudoExport'](){
    let tag = this._find(['@_pseudoExport']);
    if (tag) {
      this._value.pseudoExport = ['', 'true', true].includes(tag.tagValue);
      return;
    }

    if (this._node.__esdoc__pseudo_export) {
      this._value.pseudoExport = true;
    }
  }

  /** for @_undocument, does not need to use this tag */
  ['@_undocument']() {
    let tag = this._find(['@_undocument']);
    if (tag) {
      this._value.undocument = true;
    }
  }

  /** for @_unknown, does not need to use this tag */
  ['@_unknown']() {
    for (let tag of this._commentTags) {
      if (this[tag.tagName]) continue;

      if (!this._value.unknown) this._value.unknown = [];
      this._value.unknown.push(tag);
    }
  }

  /** for @param. */
  ['@param']() {
    let values = this._findAllTagValues(['@param']);
    if (!values) return;

    this._value.params = [];
    for (let value of values) {
      let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
      if (!typeText || !paramName) {
        InvalidCodeLogger.show(this._pathResolver.fileFullPath, this._node);
        continue;
      }
      let result = ParamParser.parseParam(typeText, paramName, paramDesc);
      this._value.params.push(result);
    }
  }

  /** for @return, @returns. */
  ['@return']() {
    let value = this._findTagValue(['@return', '@returns']);
    if (!value) return;

    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, false, true);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    this._value.return = result;
  }

  /** for @property. */
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

  /** for @type. */
  ['@type']() {
    let value = this._findTagValue(['@type']);
    if (!value) return;

    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, false, false);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    this._value.type = result;
  }

  /** for @abstract. */
  ['@abstract']() {
    let tag = this._find(['@abstract']);
    if (tag) {
      this._value.abstract = true;
    }
  }

  /** for @voerride. */
  ['@override'](){
    let tag = this._find(['@override']);
    if (tag) {
      this._value.override = true;
    }
  }

  /** for @throws. */
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

  /** for @emits. */
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

  /** for @listens. */
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

  /** for @_member. */
  ['@_member']() {
    let value = this._findTagValue(['@_member']);
    if (!value) return;

    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, true, false);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    this._value.type = result;
  }

  /** for @_content, does not need to use this tag */
  ['@_content']() {
    let value = this._findTagValue(['@_content']);
    if (value) {
      this._value.content = value;
    }
  }

  /** for @_generator, does not need to use this tag */
  ['@_generator']() {
    let tag = this._find(['@_generator']);
    if (tag) {
      this._value.generator = true;
    }
  }

  /**
   * find all tags.
   * @param {string[]} names - tag names.
   * @returns {Tag[]|null} found tags.
   * @private
   */
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

  /**
   * find last tag.
   * @param {string[]} names - tag names.
   * @returns {Tag|null} found tag.
   * @private
   */
  _find(names) {
    let results = this._findAll(names);
    if (results && results.length) {
      return results[results.length - 1];
    } else {
      return null;
    }
  }

  /**
   * find all tag values.
   * @param {string[]} names - tag names.
   * @returns {*[]|null} found values.
   * @private
   */
  _findAllTagValues(names) {
    let tags = this._findAll(names);
    if (!tags) return null;

    let results = [];
    for (let tag of tags) {
      results.push(tag.tagValue);
    }

    return results;
  }

  /**
   * find ta value.
   * @param {string[]} names - tag names.
   * @returns {*|null} found value.
   * @private
   */
  _findTagValue(names) {
    let tag = this._find(names);
    if (tag) {
      return tag.tagValue;
    } else {
      return null;
    }
  }

  /**
   * resolve long name.
   * if the name relates import path, consider import path.
   * @param {string} name - identifier name.
   * @returns {string} resolved name.
   * @private
   */
  _resolveLongname(name) {
    let importPath = ASTUtil.findPathInImportDeclaration(this._ast, name);
    if (!importPath) return name;

    if (importPath.charAt(0) === '.' || importPath.charAt(0) === '/') {
      if (!path.extname(importPath)) importPath += '.js';

      let resolvedPath = this._pathResolver.resolve(importPath);
      let longname = `${resolvedPath}~${name}`;
      return longname;
    } else {
      let longname = `${importPath}~${name}`;
      return longname;
    }
  }

  /**
   * flatten member expression property name.
   * if node structure is [foo [bar [baz [this] ] ] ], flatten is ``this.baz.bar.foo``
   * @param {ASTNode} node - target member expression node.
   * @returns {string} flatten property.
   * @private
   */
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

  /**
   * find class in same file, import or external.
   * @param {string} className - target class name.
   * @returns {string} found class long name.
   * @private
   */
  _findClassLongname(className) {
    // find in same file.
    for (let node of this._ast.body) {
      if (!['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(node.type)) continue;
      if (node.declaration && node.declaration.type === 'ClassDeclaration' && node.declaration.id.name === className) {
        return `${this._pathResolver.filePath}~${className}`;
      }
    }

    // find in import.
    let importPath = ASTUtil.findPathInImportDeclaration(this._ast, className);
    if (importPath) return this._resolveLongname(className);

    // find in external
    return className;
  }
}
