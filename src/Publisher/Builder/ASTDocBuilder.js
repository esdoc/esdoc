import DocBuilder from './DocBuilder.js';

/**
 * AST Output Builder class.
 */
export default class ASTDocBuilder extends DocBuilder {
  /**
   * create instance.
   * @param {Taffy} data - doc comment database.
   * @param {AST[]} asts - all source code ASTs.
   * @param {ESDocConfig} config - ESDoc config object.
   */
  constructor(data, asts, config) {
    super(data, config);
    this._asts = asts;
  }

  /**
   * execute building output.
   * @param {function(ast: string, filePath: string)} callback - is called each asts.
   */
  exec(callback) {
    for (const ast of this._asts) {
      const json = JSON.stringify(ast.ast, null, 2);
      const filePath = `ast/${ast.filePath}.json`;
      callback(json, filePath);
    }
  }
}
