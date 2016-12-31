import Logger from 'color-logger';
import assert from 'assert';
import ASTUtil from '../Util/ASTUtil.js';

const logger = new Logger('ParamParser');

/**
 * Param Type Parser class.
 */
export default class ParamParser {

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
    let paramDesc = null;

    // e.g {number}
    if (type) {
      const reg = /^\{([^@]*?)\}(\s+|$)/; // ``@`` is special char in ``{@link foo}``
      match = value.match(reg);
      if (match) {
        typeText = match[1];
        value = value.replace(reg, '');
      } else {
        typeText = '*';
      }
    }

    // e.g. [p1=123]
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
      typeText = typeText.replace(/^[?!]/, '');

      // check record and union
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
        paramName = paramName.replace(/^[\[]/, '').replace(/[\]]$/, '');
      } else {
        result.optional = false;
      }

      // check default value
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

  /* eslint-disable complexity */
  /* eslint-disable max-statements */
  /**
   * guess param type by using param default arguments.
   * @param {Object} params - node of callable AST node.
   * @returns {ParsedParam[]} guess param results.
   *
   * @example
   * // with method
   * let results = ParamParser.guessParams(node.value.params);
   *
   * // with function
   * let results = ParamParser.guessParams(node.params);
   */
  static guessParams(params) {
    const _params = [];
    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      const result = {};

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
            result.name = `objectPattern${i === 0 ? '' : i}`;
          } else if (param.left.type === 'ArrayPattern') {
            result.name = `arrayPattern${i === 0 ? '' : i}`;
          }

          result.optional = true;

          if (param.right.type.includes('Literal')) {
            // e.g. func(a = 10){}
            result.types = param.right.value === null ? ['*'] : [typeof param.right.value];
            result.defaultRaw = param.right.value;
            result.defaultValue = `${result.defaultRaw}`;
          } else if (param.right.type === 'ArrayExpression') {
            // e.g. func(a = [123]){}
            result.types = param.right.elements.length ? [`${typeof param.right.elements[0].value}[]`] : ['*[]'];
            result.defaultRaw = param.right.elements.map((elm)=> elm.value);
            result.defaultValue = `${JSON.stringify(result.defaultRaw)}`;
          } else if (param.right.type === 'ObjectExpression') {
            const typeMap = {};
            for (const prop of param.left.properties || []) {
              typeMap[prop.key.name] = '*';
            }

            // e.g. func(a = {key: 123}){}
            const obj = {};
            for (const prop of param.right.properties) {
              obj[prop.key.name] = prop.value.value;
              typeMap[prop.key.name] = typeof prop.value.value;
            }

            const types = [];
            for (const key of Object.keys(typeMap)) {
              types.push(`"${key}": ${typeMap[key]}`);
            }

            result.types = [`{${types.join(', ')}}`];
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
        case 'ObjectPattern': {
          const objectPattern = [];
          const raw = {};
          for (const property of param.properties) {
            if (property.type === 'ObjectProperty') {
              objectPattern.push(`"${property.key.name}": *`);
              raw[property.key.name] = null;
            } else if (property.type === 'RestProperty') {
              objectPattern.push(`...${property.argument.name}: Object`);
              raw[property.argument.name] = {};
            }
          }
          result.name = `objectPattern${i === 0 ? '' : i}`;
          result.types = [`{${objectPattern.join(', ')}}`];
          result.defaultRaw = raw;
          result.defaultValue = `${JSON.stringify(result.defaultRaw)}`;
          break;
        }
        case 'ArrayPattern': {
          // e.g. func([a, b = 10]){}
          let arrayType = null;
          const raw = [];

          for (const element of param.elements) {
            if (element.type === 'Identifier') {
              raw.push('null');
            } else if (element.type === 'AssignmentPattern') {
              if ('value' in element.right) {
                if (!arrayType && element.right.value !== null) arrayType = typeof element.right.value;
                raw.push(JSON.stringify(element.right.value));
              } else {
                raw.push('*');
              }
            }
          }

          if (!arrayType) arrayType = '*';
          result.name = `arrayPattern${i === 0 ? '' : i}`;
          result.types = [`${arrayType}[]`];
          result.defaultRaw = raw;
          result.defaultValue = `[${raw.join(', ')}]`;
          break;
        }
        default:
          logger.w('unknown param.type', param);
      }

      _params.push(result);
    }

    return _params;
  }

  /**
   * guess return type by using return node.
   * @param {ASTNode} body - callable body node.
   * @returns {ParsedParam|null}
   */
  static guessReturnParam(body) {
    const result = {};
    const guessType = this.guessType.bind(this);

    ASTUtil.traverse(body, (node, parent, path)=>{
      // `return` in Function is not the body's `return`
      if (node.type.includes('Function')) {
        path.skip();
        return;
      }

      if (node.type !== 'ReturnStatement') return;

      if (!node.argument) return;

      result.types = guessType(node.argument).types;
    });

    if (result.types) {
      return result;
    }

    return null;
  }

  /**
   * guess self type by using assignment node.
   * @param {ASTNode} right - assignment right node.
   * @returns {ParsedParam}
   */
  static guessType(right) {
    if (!right) {
      return {types: ['*']};
    }

    if (right.type === 'TemplateLiteral') {
      return {types: ['string']};
    }

    if (right.type === 'NullLiteral') {
      return {types: ['*']};
    }

    if (right.type.includes('Literal')) {
      return {types: [typeof right.value]};
    }

    if (right.type === 'ArrayExpression') {
      if (right.elements.length) {
        return {types: [`${typeof right.elements[0].value}[]`]};
      } else {
        return {types: ['*[]']};
      }
    }

    if (right.type === 'ObjectExpression') {
      const typeMap = {};
      for (const prop of right.properties) {
        const name = prop.key.name || prop.key.value;
        switch (prop.type) {
          case 'ObjectProperty':
            typeMap[name] = prop.value.value ? typeof prop.value.value : '*';
            break;
          case 'ObjectMethod':
            typeMap[name] = 'function';
            break;
          default:
            typeMap[name] = '*';
        }
      }

      const types = [];
      for (const key of Object.keys(typeMap)) {
        types.push(`"${key}": ${typeMap[key]}`);
      }

      return {types: [`{${types.join(', ')}}`]};
    }

    return {types: ['*']};
  }
}
