import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';
import NamingUtil from '../Util/NamingUtil.js';

/**
 * Doc Class from Function declaration AST node.
 */
export default class FunctionDoc extends AbstractDoc {
  /** specify ``function`` to kind. */
  ['@_kind']() {
    super['@_kind']();
    if (this._value.kind) return;
    this._value.kind = 'function';
    this._value.decorator = false;
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

  /** take out self name from file path */
  ['@_memberof']() {
    super['@_memberof']();
    if (this._value.memberof) return;
    this._value.memberof = this._pathResolver.filePath;
  }

  /** check generator property in self node */
  ['@_generator']() {
    super['@_generator']();
    if ('generator' in this._value) return;

    this._value.generator = this._node.generator;
  }

  /** if @param is not exists, guess type of param by using self node. */
  ['@param']() {
    super['@param']();
    if (this._value.params) return;

    this._value.params = ParamParser.guessParams(this._node.params);
  }

  /** if @return is not exists, guess type of return by using self node. */
  ['@return']() {
    super['@return']();
    if (this._value.return) return;

    let result = ParamParser.guessReturnParam(this._node.body);
    if (result) {
      this._value.return = result;
    }
  }

  ['@decorator']() {
    let value = this._findTagValue(['@decorator']);
    if (!value) return;

    let {typeText} = ParamParser.parseParamValue(value, true, false, false);
    let result = ParamParser.parseParam(typeText);
    this._value.decorator = true;
    this._value.decorates = result;
  }

  _apply() {
    super._apply();
    this['@decorator']();
  }
}
