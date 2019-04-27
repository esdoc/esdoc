"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _colorLogger = _interopRequireDefault(require("color-logger"));

var _AbstractDoc = _interopRequireDefault(require("./AbstractDoc.js"));

var _ParamParser = _interopRequireDefault(require("../Parser/ParamParser.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Doc class for virtual comment node of typedef.
 */
class TypedefDoc extends _AbstractDoc.default {
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
      _colorLogger.default.w('can not resolve name.');

      return;
    }

    let name;

    for (const tag of tags) {
      const {
        paramName
      } = _ParamParser.default.parseParamValue(tag.tagValue, true, true, false);

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

    const {
      typeText,
      paramName,
      paramDesc
    } = _ParamParser.default.parseParamValue(value, true, true, false);

    const result = _ParamParser.default.parseParam(typeText, paramName, paramDesc);

    Reflect.deleteProperty(result, 'description');
    Reflect.deleteProperty(result, 'nullable');
    Reflect.deleteProperty(result, 'spread');
    this._value.type = result;
  }

}

exports.default = TypedefDoc;