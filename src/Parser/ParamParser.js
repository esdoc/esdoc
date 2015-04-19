import Logger from 'color-logger';
import assert from 'assert';
import ASTUtil from '../Util/ASTUtil.js';

let logger = new Logger('ParamParser');

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

  static guessParams(params) {
    let _params = [];
    for (let param of params) {
      let result = {};

      switch (param.type) {
        case 'Identifier':
          // e.g. func(a){}
          result.name = param.name;
          result.types = ['*'];
          break;

        case 'AssignmentPattern':
          if (param.left.type === 'Identifier') {
            result.name = param.left.name;
          } else if (param.left.type === 'ObjectPattern') {
            let names = [];
            for (let prop of param.left.properties) {
              names.push(prop.key.name);
            }
            result.name = `{${names.join(',')}}`;
          }

          result.optional = true;

          if (param.right.type === 'Literal') {
            // e.g. func(a = 10){}
            result.types = param.right.value === null ? ['*'] : [typeof param.right.value];
            result.defaultRaw = param.right.value;
            result.defaultValue = `${result.defaultRaw}`;
          } else if (param.right.type === 'ArrayExpression') {
            // e.g. func(a = [123]){}
            result.types = param.right.elements.length ? [`${typeof param.right.elements[0].value}[]`] : ['*[]'];
            result.defaultRaw = param.right.elements.map((elm)=> elm.value);
            result.defaultValue = `${JSON.stringify(result.defaultRaw)}`;
          } else if(param.right.type === 'ObjectExpression'){
            // e.g. func(a = {key: 123}){}
            let obj = {};
            for (let prop of param.right.properties) {
              obj[prop.key.name] = prop.value.value;
            }

            result.types = [`${JSON.stringify(obj)}`];
            result.defaultRaw = obj;
            result.defaultValue = `${JSON.stringify(result.defaultRaw)}`;
          } else if (param.right.type === 'Identifier') {
            // e.g. func(a = value){}
            result.types = ['*'];
            result.defaultRaw = param.right.name;
            result.defaultValue = `${param.right.name}`;
          } else {
            // e.g. func(a = new Foo()){}, func(a = foo()){}
            // CallExpression, NewExpression
            result.types = ['*'];
          }
          break;
        case 'RestElement':
          // e.g. func(...a){}
          result.name = `${param.argument.name}`;
          result.types = ['...*'];
          result.spread = true;
          break;
        default:
          logger.w('unknown param.type', param);
      }

      _params.push(result);
    }

    return _params;
  }

  static guessReturnParam(body) {
    let result = {};

    ASTUtil.traverse(body, function(node, parent){
      // `return` in Function is not the body's `return`
      if (node.type.includes('Function')) {
        this.skip();
        return;
      }

      if (node.type !== 'ReturnStatement') return;

      if (!node.argument) return;

      switch (node.argument.type) {
        case 'Literal':
          if (node.argument.value === null) {
            result.types = result.types || ['*'];
          } else {
            result.types = [typeof node.argument.value];
          }
          break;
        case 'TemplateLiteral':
          result.types = ['string'];
          break;
        default:
          // todo: more better guess.
          result.types = ['*'];
      }
    });

    if (result.types) {
      return result;
    }

    return null;
  }
}
