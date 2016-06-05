import * as babylon from 'babylon';
import fs           from 'fs-extra';
import path         from 'path';
import espree       from 'espree';
import Plugin       from '../Plugin/Plugin.js';

const esmRegex = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

/**
 * ECMAScript Parser class.
 *
 * @example
 * let ast = ESParser.parse('./src/foo.js');
 */
export default class ESParser {
  /**
   * parse ECMAScript source code.
   * @param {string} filePath - source code file path.
   * @returns {AST} AST of source code.
   */
  static parse(filePath) {
    let code = fs.readFileSync(filePath, {encode: 'utf8'}).toString();

    code = Plugin.onHandleCode(code, filePath);

    if (code.charAt(0) === '#') {
      code = code.replace(/^#!/, '//');
    }

    //let option = {
    //  comments: true,
    //  attachComment: true,
    //  loc: true,
    //  ecmaVersion: 6,
    //  ecmaFeatures:
    //  {
    //    jsx: true
    //  }
    //};
    //
    //let parser = (code) => {
    //  option.sourceType = esmRegex.test(code) ? 'module' : 'script';
    //  return espree.parse(code, option);
    //};

    let option =
    {
      plugins: ['asyncFunctions', 'asyncGenerators', 'classConstructorCall', 'classProperties', 'decorators',
       'doExpressions', 'exportExtensions', 'exponentiationOperator', 'flow', 'functionBind', 'functionSent',
        'jsx', 'objectRestSpread', 'trailingFunctionCommas']
    };

    let parser = (code) => {
      option.sourceType = esmRegex.test(code) ? 'module' : 'script';
      return babylon.parse(code, option);
    };

    parser = Plugin.onHandleCodeParser(parser, option, filePath, code);

    let ast = parser(code);

    ast = Plugin.onHandleAST(ast, filePath, code);

    return ast;
  }
}
