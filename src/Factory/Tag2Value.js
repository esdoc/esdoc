import assert from 'assert';
import Logger from '../Util/Logger.js';

function l(a1, a2) {
  if (a1.length) {
    return a1[a1.length - 1];
  } else if (a2.length) {
    return a2[a2.length -1];
  } else {
    throw new Error('all array are empty.');
  }
}

/**
 * @param {Tag[]} tags
 * @returns {Object.<string, *[]>}
 * @private
 */
function tagsToMap(tags) {
  let map = {};
  for (let tag of tags) {
    let {tagName = '@unknown', tagValue = null} = tag;
    if (!map[tagName]) map[tagName] = [];
    map[tagName].push(tagValue);
  }

  return map;
}

function parseParamValue(value, type = true, name = true, desc = true) {
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

function parseParam(typeText = null, paramName = null, paramDesc = null) {
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
      result.default = pair[1];
      try {
        let raw = JSON.parse(pair[1]);
        result.defaultraw = raw;
      } catch (e) {
        result.defaultraw = pair[1];
      }
    } else {
      result.defaultValue = 'undefined';
      result.defaultValueRaw = undefined;
    }

    result.name = pair[0];
  }

  result.description = paramDesc;

  return result;
}

let TAG = 'Tag2Value';

export default class Tag2Value {
  /**
   * @param {Tag[]} commentTags
   * @param {Tag[]} systemTags
   */
  constructor(commentTags, systemTags) {
    /**
     * @type {DocValue}
     * @private
     */
    this._value = {access: null};

    let commentTagsMap = tagsToMap(commentTags);
    let systemTagsMap = tagsToMap(systemTags);

    let commentTagNames = Object.keys(commentTagsMap);
    let systemTagNames = Object.keys(systemTagsMap);

    let tagNames = new Set([...commentTagNames, ...systemTagNames]);

    for (let tagName of tagNames) {
      let commentValues = commentTagsMap[tagName] || [];
      let systemValues = systemTagsMap[tagName] || [];

        if (this[tagName]) {
          if (commentValues.length || systemValues.length) {
            this[tagName](commentValues, systemValues, commentTagsMap, systemTagsMap);
          }
        } else {
          this['@unknown'](tagName, commentValues, systemValues);
        }
    }
  }

  get value(){
    return JSON.parse(JSON.stringify(this._value));
  }

  ['@unknown'](name, commentValues, systemValues) {
    if (!this._value.unknown) this._value.unknown = {};
    if (!this._value.unknown[name]) this._value.unknown[name] = [];

    this._value.unknown[name].push(...commentValues);
    this._value.unknown[name].push(...systemValues);

    Logger.w(TAG, `unknown tag: ${name}`);
  }

  ['@desc'](commentValues, systemValues) {
    if (commentValues.length) {
      this._value.description = commentValues.join('\n');
    } else if (systemValues.length) {
      this._value.description = systemValues.join('\n');
    }
  }

  ['@export'](commentValues, systemValues) {
    this._value.export = l(commentValues, systemValues);
  }

  ['@importPath'](commentValues, systemValues) {
    this._value.importPath = l(commentValues, systemValues);
  }

  ['@importStyle'](commentValues, systemValues) {
    this._value.importStyle = l(commentValues, systemValues);
  }

  ['@name'](commentValues, systemValues) {
    this._value.name = l(commentValues, systemValues);
  }

  ['@memberof'](commentValues, systemValues) {
    this._value.memberof = l(commentValues, systemValues);
  }

  ['@longname'](commentValues, systemValues) {
    this._value.longname = l(commentValues, systemValues);
  }

  ['@kind'](commentValues, systemValues) {
    this._value.kind = l(commentValues, systemValues);
  }

  ['@static'](commentValues, systemValues) {
    this._value['static'] = l(commentValues, systemValues);
  }

  ['@example'](commentValues, systemValues) {
    this._value.examples = [...commentValues, ...systemValues];
  }

  ['@public']() {
    this._value.access = 'public';
  }

  ['@private']() {
    this._value.access = 'private';
  }

  ['@protected']() {
    this._value.access = 'protected';
  }

  //==============================
  // for method
  //==============================
  ['@param'](commentValues, systemValues) {
    let values = commentValues.length ? commentValues : systemValues;

    this._value.params = [];
    for (let value of values) {
      let {typeText, paramName, paramDesc} = parseParamValue(value);
      let result = parseParam(typeText, paramName, paramDesc);
      this._value.params.push(result);
    }
  }

  ['@property'](commentValues, systemValues) {
    let values = commentValues.length ? commentValues : systemValues;

    this._value.properties = [];
    for (let value of values) {
      let {typeText, paramName, paramDesc} = parseParamValue(value);
      let result = parseParam(typeText, paramName, paramDesc);
      this._value.properties.push(result);
    }
  }

  ['@return'](commentValues, systemValues) {
    let value = l(commentValues, systemValues);
    let {typeText, paramName, paramDesc} = parseParamValue(value, true, false, true);
    let result = parseParam(typeText, paramName, paramDesc);
    this._value.return = result;
  }

  ['@type'](commentValues, systemValues) {
    let value = l(commentValues, systemValues);
    let {typeText, paramName, paramDesc} = parseParamValue(value, true, false, false);
    let result = parseParam(typeText, paramName, paramDesc);
    this._value.type = result;
  }

  ['@member'](commentValues, systemValues) {
    let value = l(commentValues, systemValues);
    let {typeText, paramName, paramDesc} = parseParamValue(value, true, true, false);
    let result = parseParam(typeText, paramName, paramDesc);
    this._value.type = result;
  }

  //==============================
  // for class
  //==============================

  ['@interface'](commentValues, systemValues) {
    var last = l(commentValues, systemValues);
    if (last === '' || last) {
      this._value.interface = true;
    } else {
      this._value.interface = false;
    }
  }

  ['@extends'](commentValues, systemValues) {
    if (commentValues.length) {
      this._value.extends = [...commentValues];
    } else if (systemValues.length) {
      this._value.extends = [...systemValues];
    }
  }
}

/**
 * @typedef {Object} DocValue
 * @property {string} desc
 * @property {string} name
 * @property {string} memberof
 * @property {string} longname
 * @property {string[]} example
 *
 * @property {boolean} interface
 * @property {string[]} extends
 */
