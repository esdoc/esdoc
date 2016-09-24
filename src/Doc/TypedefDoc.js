import Logger from 'color-logger';
import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';

const logger = new Logger('TypedefDoc');

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

    this._$typedef();

    Reflect.deleteProperty(this._value, 'export');
    Reflect.deleteProperty(this._value, 'importPath');
    Reflect.deleteProperty(this._value, 'importStyle');
  }

  /** specify ``typedef`` to kind. */
  _$kind() {
    super._$kind();
    this._value.kind = 'typedef';
  }

  /** set name by using tag. */
  _$name() {
    const tags = this._findAll(['@typedef']);
    if (!tags) {
      logger.w('can not resolve name.');
      return;
    }

    let name;
    for (const tag of tags) {
      const {paramName} = ParamParser.parseParamValue(tag.tagValue, true, true, false);
      name = paramName;
    }

    this._value.name = name;
  }

  /** set memberof by using file path. */
  _$memberof() {
    super._$memberof();

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
  _$typedef() {
    const value = this._findTagValue(['@typedef']);
    if (!value) return;

    const {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value, true, true, false);
    const result = ParamParser.parseParam(typeText, paramName, paramDesc);

    Reflect.deleteProperty(result, 'description');
    Reflect.deleteProperty(result, 'nullable');
    Reflect.deleteProperty(result, 'spread');

    this._value.type = result;
  }
}
