import AbstractDoc from './AbstractDoc.js';
import MethodDoc from './MethodDoc.js';
import ParamParser from '../Parser/ParamParser.js';

/**
 * Doc Class from ClassProperty AST node.
 */
export default class ClassPropertyDoc extends AbstractDoc {
  /**
   * apply own tag.
   * @private
   */
  _apply() {
    super._apply();

    Reflect.deleteProperty(this._value, 'export');
    Reflect.deleteProperty(this._value, 'importPath');
    Reflect.deleteProperty(this._value, 'importStyle');
  }

  /** specify ``member`` to kind. */
  _$kind() {
    super._$kind();
    this._value.kind = 'member';
  }

  /** take out self name from self node */
  _$name() {
    super._$name();
    this._value.name = this._node.key.name;
  }

  /** borrow {@link MethodDoc#@_memberof} */
  _$memberof() {
    Reflect.apply(MethodDoc.prototype._$memberof, this, []);
  }

  /** if @type is not exists, guess type by using self node */
  _$type() {
    super._$type();
    if (this._value.type) return;

    this._value.type = ParamParser.guessType(this._node.value);
  }
}
