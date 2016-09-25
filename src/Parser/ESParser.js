import fs from 'fs-extra';
import Plugin from '../Plugin/Plugin.js';
import * as babylon from 'babylon';

/**
 * ECMAScript Parser class.
 *
 * @example
 * let ast = ESParser.parse('./src/foo.js');
 */
export default class ESParser {
  /**
   * parse ECMAScript source code.
   * @param {ESDocConfig} config - config of esdoc.
   * @param {string} filePath - source code file path.
   * @returns {AST} AST of source code.
   */
  static parse(config, filePath) {
    return this.parseWithBabylon(config, filePath);
  }

  static parseWithBabylon(config, filePath) {
    let code = fs.readFileSync(filePath, {encode: 'utf8'}).toString();
    code = Plugin.onHandleCode(code, filePath);
    if (code.charAt(0) === '#') code = code.replace(/^#!/, '//');

    const option = {
      sourceType: 'module',
      plugins: ['jsx']
    };

    let parser = (code) => {
      return babylon.parse(code, option);
    };

    parser = Plugin.onHandleCodeParser(parser, option, filePath, code);

    let ast = parser(code);

    ast = Plugin.onHandleAST(ast, filePath, code);

    return ast;
  }
}
