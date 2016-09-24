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
  constructor(ast, node, pathResolver, commentTags = []) {
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
   * @protected
   */
  _apply() {
    this._$kind();
    this._$variation();
    this._$name();
    this._$memberof();
    this._$member();
    this._$content();
    this._$generator();

    this._$static();
    this._$longname();
    this._$access();
    this._$export();
    this._$importPath();
    this._$importStyle();
    this._$desc();
    this._$example();
    this._$see();
    this._$lineNumber();
    this._$deprecated();
    this._$experimental();
    this._$since();
    this._$version();
    this._$todo();
    this._$ignore();
    this._$pseudoExport();
    this._$undocument();
    this._$unknown();
    this._$param();
    this._$property();
    this._$return();
    this._$type();
    this._$abstract();
    this._$override();
    this._$throws();
    this._$emits();
    this._$listens();
  }

  /**
   * decide `kind`.
   * @abstract
   */
  _$kind() {}

  /** for @_variation */
  /**
   * decide `variation`.
   * @todo implements `@variation`.
   * @abstract
   */
  _$variation() {}

  /**
   * decide `name`
   * @abstract
   */
  _$name() {}

  /**
   * decide `memberof`.
   * @abstract
   */
  _$memberof() {}

  /**
   * decide `member`.
   * @abstract
   */
  _$member() {}

  /**
   * decide `content`.
   * @abstract
   */
  _$content() {}

  /**
   * decide `generator`.
   * @abstract
   */
  _$generator() {}

  /**
   * decide `static`.
   */
  _$static() {
    if ('static' in this._node) {
      this._value.static = this._node.static;
    } else {
      this._value.static = true;
    }
  }

  /**
   * decide `longname`.
   */
  _$longname() {
    let memberof = this._value.memberof;
    let name = this._value.name;
    let scope = this._value.static ? '.' : '#';
    if (memberof.includes('~')) {
      this._value.longname = `${memberof}${scope}${name}`;
    } else {
      this._value.longname = `${memberof}~${name}`;
    }
  }

  /**
   * decide `access`.
   * process also @public, @private and @protected.
   */
  _$access() {
    let tag = this._find(['@access', '@public', '@private', '@protected']);
    if (tag) {
      let access;
      /* eslint-disable max-statements-per-line */
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

  /**
   * avoid unknown tag.
   */
  _$public() {}

  /**
   * avoid unknown tag.
   */
  _$protected() {}

  /**
   * avoid unknown tag.
   */
  _$private() {}

  /**
   * decide `export`.
   */
  _$export() {
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

  /**
   * decide `importPath`.
   */
  _$importPath() {
    this._value.importPath = this._pathResolver.importPath;
  }

  /**
   * decide `importStyle`.
   */
  _$importStyle() {
    if (this._node.__PseudoExport__) {
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

  /**
   * decide `description`.
   */
  _$desc() {
    this._value.description = this._findTagValue(['@desc']);
  }

  /**
   * decide `examples`.
   */
  _$example() {
    let tags = this._findAll(['@example']);
    if (!tags) return;
    if (!tags.length) return;

    this._value.examples = [];
    for (let tag of tags) {
      this._value.examples.push(tag.tagValue);
    }
  }

  /**
   * decide `see`.
   */
  _$see() {
    let tags = this._findAll(['@see']);
    if (!tags) return;
    if (!tags.length) return;

    this._value.see = [];
    for (let tag of tags) {
      this._value.see.push(tag.tagValue);
    }
  }

  /**
   * decide `lineNumber`.
   */
  _$lineNumber() {
    let node = this._node;
    if (node.loc) {
      this._value.lineNumber = node.loc.start.line;
    }
  }

  /**
   * decide `deprecated`.
   */
  _$deprecated() {
    let tag = this._find(['@deprecated']);
    if (tag) {
      if (tag.tagValue) {
        this._value.deprecated = tag.tagValue;
      } else {
        this._value.deprecated = true;
      }
    }
  }

  /**
   * decide `experimental`.
   */
  _$experimental() {
    let tag = this._find(['@experimental']);
    if (tag) {
      if (tag.tagValue) {
        this._value.experimental = tag.tagValue;
      } else {
        this._value.experimental = true;
      }
    }
  }

  /**
   * decide `since`.
   */
  _$since() {
    let tag = this._find(['@since']);
    if (tag) {
      this._value.since = tag.tagValue;
    }
  }

  /**
   * decide `version`.
   */
  _$version() {
    let tag = this._find(['@version']);
    if (tag) {
      this._value.version = tag.tagValue;
    }
  }

  /**
   * decide `todo`.
   */
  _$todo() {
    let tags = this._findAll(['@todo']);
    if (tags) {
      this._value.todo = [];
      for (let tag of tags) {
        this._value.todo.push(tag.tagValue);
      }
    }
  }

  /**
   * decide `ignore`.
   */
  _$ignore() {
    let tag = this._find(['@ignore']);
    if (tag) {
      this._value.ignore = true;
    }
  }

  /**
   * decide `pseudoExport`.
   */
  _$pseudoExport() {
    if (this._node.__PseudoExport__) {
      this._value.pseudoExport = true;
    }
  }

  /**
   * decide `undocument` with internal tag.
   */
  _$undocument() {
    let tag = this._find(['@_undocument']);
    if (tag) {
      this._value.undocument = true;
    }
  }

  /**
   * decide `unknown`.
   */
  _$unknown() {
    for (let tag of this._commentTags) {
      const methodName = tag.tagName.replace(/^[@]/, '_$');
      if (this[methodName]) continue;

      if (!this._value.unknown) this._value.unknown = [];
      this._value.unknown.push(tag);
    }
  }

  /**
   * decide `param`.
   */
  _$param() {
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

  /**
   * decide `return`.
   */
  _$return() {
    let value = this._findTagValue(['@return', '@returns']);
    if (!value) return;

    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, false, true);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    this._value.return = result;
  }

  /**
   * decide `property`.
   */
  _$property() {
    let values = this._findAllTagValues(['@property']);
    if (!values) return;

    this._value.properties = [];
    for (let value of values) {
      let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
      let result = ParamParser.parseParam(typeText, paramName, paramDesc);
      this._value.properties.push(result);
    }
  }

  /**
   * decide `type`.
   */
  _$type() {
    let value = this._findTagValue(['@type']);
    if (!value) return;

    let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, false, false);
    let result = ParamParser.parseParam(typeText, paramName, paramDesc);
    this._value.type = result;
  }

  /**
   * decide `abstract`.
   */
  _$abstract() {
    let tag = this._find(['@abstract']);
    if (tag) {
      this._value.abstract = true;
    }
  }

  /**
   * decide `override`.
   */
  _$override() {
    let tag = this._find(['@override']);
    if (tag) {
      this._value.override = true;
    }
  }

  /**
   * decide `throws`.
   */
  _$throws() {
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

  /**
   * decide `emits`.
   */
  _$emits() {
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

  /**
   * decide `listens`.
   */
  _$listens() {
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
   * @protected
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

    while (target) {
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
    for (let node of this._ast.program.body) {
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
