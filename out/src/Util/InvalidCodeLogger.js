'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * logger for invalid code which can not be parsed with ESDoc.
 */

var InvalidCodeLogger = function () {
  function InvalidCodeLogger() {
    _classCallCheck(this, InvalidCodeLogger);
  }

  _createClass(InvalidCodeLogger, [{
    key: 'show',


    /**
     * show log.
     * @param {string} filePath - invalid code in this file.
     * @param {ASTNode} [node] - fail parsing node.
     */
    value: function show(filePath, node) {
      if (!node) {
        this.showFile(filePath);
        return;
      }

      var lines = _fsExtra2.default.readFileSync(filePath).toString().split('\n');
      var targetLines = [];
      var start = void 0;
      var end = node.loc.start.line;

      if (node.leadingComments && node.leadingComments[0]) {
        start = node.leadingComments[0].loc.start.line;
      } else {
        start = Math.max(0, end - 10);
      }

      for (var i = start - 1; i < end; i++) {
        targetLines.push(i + '| ' + lines[i]);
      }

      console.log('[31merror: could not process the following code.[32m');
      console.log(filePath);
      console.log(targetLines.join('\n'));
      console.log('[0m');
    }

    /**
     * show log.
     * @param {string} filePath - invalid code in this file.
     * @param {Error} error - error object.
     */

  }, {
    key: 'showFile',
    value: function showFile(filePath, error) {
      var lines = _fsExtra2.default.readFileSync(filePath).toString().split('\n');
      var start = Math.max(error.lineNumber - 3, 1);
      var end = Math.min(error.lineNumber + 3, lines.length);
      var targetLines = [];
      for (var i = start - 1; i < end; i++) {
        targetLines.push(i + '| ' + lines[i]);
      }

      console.log('[31mwarning: could not parse the following code. if you want to use ES7, see esdoc-es7-plugin(https://github.com/esdoc/esdoc-es7-plugin)[32m');
      console.log(filePath);
      console.log(targetLines.join('\n') + '[0m');
    }
  }]);

  return InvalidCodeLogger;
}();

/**
 * singleton for {@link InvalidCodeLogger}
 */


exports.default = new InvalidCodeLogger();