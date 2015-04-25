import DocBuilder from './DocBuilder.js';

export default class ASTDocBuilder extends DocBuilder {
  constructor(data, asts, config) {
    super(data, config);
    this._asts = asts;
  }

  exec(callback) {
    for (let ast of this._asts) {
      let json = JSON.stringify(ast.ast, null, 2);
      let filePath = `ast/${ast.filePath}.json`;
      callback(json, filePath);
    }
  }
}
