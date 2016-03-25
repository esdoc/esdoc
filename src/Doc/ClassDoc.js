import fs from 'fs-extra';
import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';
import NamingUtil from '../Util/NamingUtil.js';
import ASTNodeContainer from '../Util/ASTNodeContainer.js';

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
    this['@member']();
  }

  ['@member']() {
    let values = this._findAllTagValues(['@member']);
    if (!values) return;

    this._value.members = [];
    for (let value of values) {
      let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
      let result = ParamParser.parseParam(typeText, paramName, paramDesc);
      let types = result.types;
      this._addExtraValue({
        __docId__: ASTNodeContainer.addNode(this._node),
        kind: 'member',
        static: false,
        name: result.name,
        description: result.description,
        type: {types},
        variation: null,
        access: 'public',
        lineNumber: this._value.lineNumber,
        memberof: this._value.longname,
        longname: this._value.longname + '#' + result.name
      });
    }
  }

  /** specify ``class`` to kind. */
  ['@_kind']() {
    super['@_kind']();
    if (this._value.kind) return;
    this._value.kind = 'class';
  }

  /** take out self name from self node */
  ['@_name']() {
    super['@_name']();
    if (this._value.name) return;

    if (this._node.id) {
      this._value.name = this._node.id.name;
    } else {
      this._value.name = NamingUtil.filePathToName(this._pathResolver.filePath);
    }
  }

  /** take out self memberof from file path. */
  ['@_memberof']() {
    super['@_memberof']();
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

    if (this._node.superClass) {
      let node = this._node;
      let longnames = [];
      let targets = [];

      if (node.superClass.type === 'CallExpression') {
        targets.push(node.superClass.callee, ...node.superClass.arguments);
      } else {
        targets.push(node.superClass);
      }

      for (let target of targets) {
        switch (target.type) {
          case 'Identifier':
            longnames.push(this._resolveLongname(target.name));
            break;
          case 'MemberExpression':
            let fullIdentifier = this._flattenMemberExpression(target);
            let rootIdentifier = fullIdentifier.split('.')[0];
            let rootLongname = this._resolveLongname(rootIdentifier);
            let filePath = rootLongname.replace(/~.*/, '');
            longnames.push(`${filePath}~${fullIdentifier}`);
            break;
        }
      }

      if (node.superClass.type === 'CallExpression') {
        // expression extends may have non-class, so filter only class by name rule.
        longnames = longnames.filter((v)=> v.match(/^[A-Z]|^[$_][A-Z]/));

        let filePath = this._pathResolver.fileFullPath;
        let line = node.superClass.loc.start.line;
        let start = node.superClass.loc.start.column;
        let end = node.superClass.loc.end.column;
        this._value.expressionExtends = this._readSelection(filePath, line, start, end);
      }

      if (longnames.length) this._value.extends = longnames;
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

  /**
   * read selection text in file.
   * @param {string} filePath - target file full path.
   * @param {number} line - line number (one origin).
   * @param {number} startColumn - start column number (one origin).
   * @param {number} endColumn - end column number (one origin).
   * @returns {string} selection text
   * @private
   */
  _readSelection(filePath, line, startColumn, endColumn) {
    let code = fs.readFileSync(filePath).toString();
    let lines = code.split('\n');
    let selectionLine = lines[line - 1];
    let tmp = [];
    for (let i = startColumn; i < endColumn; i++) {
      tmp.push(selectionLine.charAt(i));
    }
    return tmp.join('');
  }
}
