'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _espree = require('espree');

var _espree2 = _interopRequireDefault(_espree);

/**
 * ECMAScript Parser class.
 *
 * @example
 * let ast = ESParser.parse('./src/foo.js');
 */

var ESParser = (function () {
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
      var code = _fsExtra2['default'].readFileSync(filePath, { encode: 'utf8' }).toString();

      if (code.charAt(0) === '#') {
        code = code.replace(/^#!/, '//');
      }

      var option = {
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

      var ast = _espree2['default'].parse(code, option);

      return ast;
    }
  }]);

  return ESParser;
})();

exports['default'] = ESParser;
module.exports = exports['default'];