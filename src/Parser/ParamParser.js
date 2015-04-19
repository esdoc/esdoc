import assert from 'assert';

export default class ParamParser {
  static parseParamValue(value, type = true, name = true, desc = true) {
    value = value.trim();

    let match;
    let typeText = null;
    let paramName = null;
    let paramDesc = null;

    // e.g {number}
    if (type) {
      match = value.match(/^\{(.*)\}(\s+|$)/);
      if (match) {
        typeText = match[1];
        value = value.replace(/^\{.*\}\s*/, '');
      } else {
        typeText = '*';
      }
    }

    // e.g. [p1=123]
    if (name) {
      match = value.match(/^(\S+)/);
      if (match) {
        paramName = match[1];
        value = value.replace(/^\S+\s*/, '')
      }
    }

    // e.g. this is p1 desc.
    if (desc) {
      match = value.match(/^\-?\s*((:?.|\n)*)$/m);
      if (match) {
        paramDesc = match[1];
      }
    }

    assert(typeText || paramName || paramDesc, `param is invalid. param = "${value}"`);

    return {typeText, paramName, paramDesc};
  }

  static parseParam(typeText = null, paramName = null, paramDesc = null) {
    let result = {};

    if (typeText) {
      // check nullable
      if (typeText[0] === '?') {
        result.nullable = true;
      } else if (typeText[0] === '!') {
        result.nullable = false;
      } else {
        result.nullable = null;
      }
      typeText = typeText.replace(/^[?!]/, '');

      // check union
      if (typeText[0] === '(') {
        typeText = typeText.replace(/^[(]/, '').replace(/[)]$/, '');
        result.types = typeText.split('|');
      } else {
        result.types = [typeText];
      }

      if (typeText.indexOf('...') === 0) {
        result.spread = true;
      } else {
        result.spread = false;
      }
    }

    if (paramName) {
      // check optional
      if (paramName[0] === '[') {
        result.optional = true;
        paramName = paramName.replace(/^[\[]/, '').replace(/[\]]$/, '');
      } else {
        result.optional = false;
      }

      // check default value
      let pair = paramName.split('=');
      if (pair.length === 2) {
        result.defaultValue = pair[1];
        try {
          let raw = JSON.parse(pair[1]);
          result.defaultRaw = raw;
        } catch (e) {
          result.defaultRaw = pair[1];
        }
      }

      result.name = pair[0];
    }

    result.description = paramDesc;

    return result;
  }
}
