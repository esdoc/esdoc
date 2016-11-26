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
    return this._parseWithBabylon(config, filePath);
  }

  /**
   * parse ECMAScript source code with babylon.
   * @param {ESDocConfig} config - config of esdoc.
   * @param {string} filePath - source code file path.
   * @returns {AST} AST of source code.
   */
  static _parseWithBabylon(config, filePath) {
    let code = fs.readFileSync(filePath, {encode: 'utf8'}).toString();
    code = Plugin.onHandleCode(code, filePath);
    if (code.charAt(0) === '#') code = code.replace(/^#!/, '//');

    const option = this._buildParserOptionForBabylon(config);

    let parser = (code) => {
      return babylon.parse(code, option);
    };

    parser = Plugin.onHandleCodeParser(parser, option, filePath, code);

    let ast = parser(code);

    ast = Plugin.onHandleAST(ast, filePath, code);

    return ast;
  }

  /**
   * build babylon option.
   * @param {ESDocConfig} config - config of esdoc
   * @returns {{sourceType: string, plugins: string[]}} option of babylon.
   * @private
   */
  static _buildParserOptionForBabylon(config) {
    const option = {
      sourceType: 'module',
      plugins: ['jsx']
    };

    const experimental = config.experimentalProposal;

    if (experimental) {
      if (experimental.classProperties) option.plugins.push('classProperties');
      if (experimental.objectRestSpread) option.plugins.push('objectRestSpread');
      if (experimental.doExpressions) option.plugins.push('doExpressions');
      if (experimental.functionBind) option.plugins.push('functionBind');
      if (experimental.functionSent) option.plugins.push('functionSent');
      if (experimental.asyncGenerators) option.plugins.push('asyncGenerators');
      if (experimental.asyncGenerators) option.plugins.push('asyncGenerators');
      if (experimental.decorators) option.plugins.push('decorators');
      if (experimental.exportExtensions) option.plugins.push('exportExtensions');
    }

    return option;
  }
}
