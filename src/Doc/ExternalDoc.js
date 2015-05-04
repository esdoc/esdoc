import Logger from 'color-logger';
import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';

let logger = new Logger('ExternalDoc');

/**
 * Doc Class from virtual comment node of external.
 */
export default class ExternalDoc extends AbstractDoc {
  /**
   * apply own tag.
   * @private
   */
  _apply() {
    super._apply();

    delete this._value.export;
    delete this._value.importPath;
    delete this._value.importStyle;
  }

  /** specify ``external`` to kind. */
  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;
    this._value.kind = 'external';
  }

  /** take out self name from tag */
  ['@name']() {
    let value = this._findTagValue(['@name', '@external']);
    if (!value) {
      logger.w(`can not resolve name.`);
    }

    this._value.name = value;

    let tags = this._findAll(['@name', '@external']);
    if (!tags) {
      logger.w(`can not resolve name.`);
      return;
    }

    let name;
    for (let tag of tags) {
      let {tagName, tagValue} = tag;
      if (tagName === '@name') {
        name = tagValue;
      } else if (tagName === '@external') {
        let {typeText, paramDesc} = ParamParser.parseParamValue(tagValue, true, false, true);
        name = typeText;
        this._value.externalLink = paramDesc;
      }
    }

    this._value.name = name;
  }

  /** take out self memberof from file path. */
  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }

  /** specify name to longname */
  ['@longname']() {
    super['@longname']();
    if (this._value.longname) return;
    this._value.longname = this._value.name;
  }

  /** for @external */
  ['@external']() {
    // avoid unknown tag.
  }
}

