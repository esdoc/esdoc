"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _Plugin = _interopRequireDefault(require("../Plugin/Plugin.js"));

var _parser = require("@babel/parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ECMAScript Parser class.
 *
 * @example
 * let ast = ESParser.parse('./src/foo.js');
 */
class ESParser {
  /**
   * parse ECMAScript source code.
   * @param {string} filePath - source code file path.
   * @returns {AST} AST of source code.
   */
  static parse(filePath) {
    let code = _fsExtra.default.readFileSync(filePath, {
      encode: 'utf8'
    }).toString();

    code = _Plugin.default.onHandleCode(code, filePath);
    if (code.charAt(0) === '#') code = code.replace(/^#!/, '//');
    let parserOption = {
      sourceType: 'module',
      plugins: []
    };

    let parser = code => {
      return (0, _parser.parse)(code, parserOption);
    };

    ({
      parser,
      parserOption
    } = _Plugin.default.onHandleCodeParser(parser, parserOption, filePath, code));
    let ast = parser(code);
    ast = _Plugin.default.onHandleAST(ast, filePath, code);
    return ast;
  }

}

exports.default = ESParser;