'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _espree = require('espree');

var _espree2 = _interopRequireDefault(_espree);

var _Plugin = require('../Plugin/Plugin.js');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var esmRegex = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

/**
 * ECMAScript Parser class.
 *
 * @example
 * let ast = ESParser.parse('./src/foo.js');
 */

var ESParser = function () {
  function ESParser() {
    _classCallCheck(this, ESParser);
  }

  _createClass(ESParser, null, [{
    key: 'parse',

    /**
     * parse ECMAScript source code.
     * @param {string} filePath - source code file path.
     * @returns {AST} AST of source code.
     */
    value: function parse(filePath) {
      var code = _fsExtra2.default.readFileSync(filePath, { encode: 'utf8' }).toString();

      code = _Plugin2.default.onHandleCode(code);

      if (code.charAt(0) === '#') {
        code = code.replace(/^#!/, '//');
      }

      var option = {
        comments: true,
        attachComment: true,
        loc: true,
        ecmaVersion: 6,
        ecmaFeatures: {
          jsx: true
        }
      };

      var parser = function parser(code) {
        option.sourceType = esmRegex.test(code) ? 'module' : 'script';
        return _espree2.default.parse(code, option);
      };

      parser = _Plugin2.default.onHandleCodeParser(parser);

      var ast = parser(code);

      ast = _Plugin2.default.onHandleAST(ast);

      return ast;
    }
  }]);

  return ESParser;
}();

exports.default = ESParser;