"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Param Type Parser class.
 */
class ParamParser {
  /**
   * parse param value.
   * @param {string} value - param value.
   * @param {boolean} [type=true] if true, contain param type.
   * @param {boolean} [name=true] if true, contain param name.
   * @param {boolean} [desc=true] if true, contain param description.
   * @return {{typeText: string, paramName: string, paramDesc: string}} parsed value.
   *
   * @example
   * let value = '{number} param - this is number param';
   * let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
   *
   * let value = '{number} this is number return value';
   * let {typeText, paramDesc} = ParamParser.parseParamValue(value, true, false, true);
   *
   * let value = '{number}';
   * let {typeText} = ParamParser.parseParamValue(value, true, false, false);
   */
  static parseParamValue(value, type = true, name = true, desc = true) {
    value = value.trim();
    let match;
    let typeText = null;
    let paramName = null;
    let paramDesc = null; // e.g {number}

    if (type) {
      const reg = /^\{([^@]*?)\}(\s+|$)/; // ``@`` is special char in ``{@link foo}``

      match = value.match(reg);

      if (match) {
        typeText = match[1];
        value = value.replace(reg, '');
      } else {
        typeText = '*';
      }
    } // e.g. [p1=123]


    if (name) {
      if (value.charAt(0) === '[') {
        paramName = '';
        let counter = 0;

        for (const c of value) {
          paramName += c;
          if (c === '[') counter++;
          if (c === ']') counter--;
          if (counter === 0) break;
        }

        if (paramName) {
          value = value.substr(paramName.length).trim();
        }
      } else {
        match = value.match(/^(\S+)/);

        if (match) {
          paramName = match[1];
          value = value.replace(/^\S+\s*/, '');
        }
      }
    } // e.g. this is p1 desc.


    if (desc) {
      match = value.match(/^-?\s*((:?.|\n)*)$/m);

      if (match) {
        paramDesc = match[1];
      }
    }

    (0, _assert.default)(typeText || paramName || paramDesc, `param is invalid. param = "${value}"`);
    return {
      typeText,
      paramName,
      paramDesc
    };
  }
  /**
   * parse param text and build formatted result.
   * @param {string} typeText - param type text.
   * @param {string} [paramName] - param name.
   * @param {string} [paramDesc] - param description.
   * @returns {ParsedParam} formatted result.
   *
   * @example
   * let value = '{number} param - this is number param';
   * let {typeText, paramName, paramDesc} = ParamParser.parseParamValue(value);
   * let result = ParamParser.parseParam(typeText, paramName, paramDesc);
   */


  static parseParam(typeText = null, paramName = null, paramDesc = null) {
    const result = {};

    if (typeText) {
      // check nullable
      if (typeText[0] === '?') {
        result.nullable = true;
      } else if (typeText[0] === '!') {
        result.nullable = false;
      } else {
        result.nullable = null;
      }

      typeText = typeText.replace(/^[?!]/, ''); // check record and union

      if (typeText[0] === '{') {
        result.types = [typeText];
      } else if (typeText[0] === '(') {
        typeText = typeText.replace(/^[(]/, '').replace(/[)]$/, '');
        result.types = typeText.split('|');
      } else if (typeText.includes('|')) {
        if (typeText.match(/<.*?\|.*?>/)) {
          // union in generics. e.g. `Array<string|number>`
          // hack: in this case, process this type in DocBuilder#_buildTypeDocLinkHTML
          result.types = [typeText];
        } else if (typeText.match(/^\.\.\.\(.*?\)/)) {
          // union with spread. e.g. `...(string|number)`
          // hack: in this case, process this type in DocBuilder#_buildTypeDocLinkHTML
          result.types = [typeText];
        } else {
          result.types = typeText.split('|');
        }
      } else {
        result.types = [typeText];
      }

      if (typeText.indexOf('...') === 0) {
        result.spread = true;
      } else {
        result.spread = false;
      }
    } else {
      result.types = [''];
    }

    if (result.types.some(t => !t)) {
      throw new Error(`Empty Type found name=${paramName} desc=${paramDesc}`);
    }

    if (paramName) {
      // check optional
      if (paramName[0] === '[') {
        result.optional = true;
        paramName = paramName.replace(/^[[]/, '').replace(/[\]]$/, '');
      } else {
        result.optional = false;
      } // check default value


      const pair = paramName.split('=');

      if (pair.length === 2) {
        result.defaultValue = pair[1];

        try {
          const raw = JSON.parse(pair[1]);
          result.defaultRaw = raw;
        } catch (e) {
          result.defaultRaw = pair[1];
        }
      }

      result.name = pair[0].trim();
    }

    result.description = paramDesc;
    return result;
  }

}

exports.default = ParamParser;