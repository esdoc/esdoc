import fs from 'fs-extra';
import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';
import NamingUtil from '../Util/NamingUtil.js';

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

    this._$interface();
    this._$extends();
    this._$implements();
  }

  /** specify ``class`` to kind. */
  _$kind() {
    super._$kind();
    this._value.kind = 'class';
  }

  /** take out self name from self node */
  _$name() {
    super._$name();

    if (this._node.id) {
      this._value.name = this._node.id.name;
    } else {
      this._value.name = NamingUtil.filePathToName(this._pathResolver.filePath);
    }
  }

  /** take out self memberof from file path. */
  _$memberof() {
    super._$memberof();
    this._value.memberof = this._pathResolver.filePath;
  }

  /** for @interface */
  _$interface() {
    const tag = this._find(['@interface']);
    if (tag) {
      this._value.interface = ['', 'true', true].includes(tag.tagValue);
    } else {
      this._value.interface = false;
    }
  }

  /** for @extends, does not need to use this tag. */
  _$extends() {
    const values = this._findAllTagValues(['@extends', '@extend']);
    if (values) {
      this._value.extends = [];
      for (const value of values) {
        const {typeText} = ParamParser.parseParamValue(value, true, false, false);
        this._value.extends.push(typeText);
      }
      return;
    }

    if (this._node.superClass) {
      const node = this._node;
      let longnames = [];
      const targets = [];

      if (node.superClass.type === 'CallExpression') {
        targets.push(node.superClass.callee, ...node.superClass.arguments);
      } else {
        targets.push(node.superClass);
      }

      for (const target of targets) {
        switch (target.type) {
          case 'Identifier':
            longnames.push(this._resolveLongname(target.name));
            break;
          case 'MemberExpression': {
            const fullIdentifier = this._flattenMemberExpression(target);
            const rootIdentifier = fullIdentifier.split('.')[0];
            const rootLongname = this._resolveLongname(rootIdentifier);
            const filePath = rootLongname.replace(/~.*/, '');
            longnames.push(`${filePath}~${fullIdentifier}`);
          }
            break;
        }
      }

      if (node.superClass.type === 'CallExpression') {
        // expression extends may have non-class, so filter only class by name rule.
        longnames = longnames.filter((v)=> v.match(/^[A-Z]|^[$_][A-Z]/));

        const filePath = this._pathResolver.fileFullPath;
        const line = node.superClass.loc.start.line;
        const start = node.superClass.loc.start.column;
        const end = node.superClass.loc.end.column;
        this._value.expressionExtends = this._readSelection(filePath, line, start, end);
      }

      if (longnames.length) this._value.extends = longnames;
    }
  }

  /** for @implements */
  _$implements() {
    const values = this._findAllTagValues(['@implements', '@implement']);
    if (!values) return;

    this._value.implements = [];
    for (const value of values) {
      const {typeText} = ParamParser.parseParamValue(value, true, false, false);
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
    const code = fs.readFileSync(filePath).toString();
    const lines = code.split('\n');
    const selectionLine = lines[line - 1];
    const tmp = [];
    for (let i = startColumn; i < endColumn; i++) {
      tmp.push(selectionLine.charAt(i));
    }
    return tmp.join('');
  }
}
