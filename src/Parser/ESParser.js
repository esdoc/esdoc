import fs from 'fs-extra';
import path from 'path';
import espree from 'espree';
import Plugin from '../Plugin/Plugin.js';

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

    let option = {
      comments: true,
      attachComment: true,
      loc: true,
      ecmaFeatures: {
        arrowFunctions: true,
        blockBindings: true,
        destructuring: true,
        regexYFlag: true,
        regexUFlag: true,
        templateStrings: true,
        binaryLiterals: true,
        octalLiterals: true,
        unicodeCodePointEscapes: true,
        defaultParams: true,
        restParams: true,
        forOf: true,
        objectLiteralComputedProperties: true,
        objectLiteralShorthandMethods: true,
        objectLiteralShorthandProperties: true,
        objectLiteralDuplicateProperties: true,
        generators: true,
        spread: true,
        classes: true,
        modules: true,
        jsx: true,
        globalReturn: true
      }
    };

    let parser = (code) => {
      return espree.parse(code, option);
    };

    parser = Plugin.onHandleCodeParser(parser, option, filePath, code);

    let ast = parser(code);

    ast = Plugin.onHandleAST(ast, filePath, code);

    return ast;
  }
}
