/**
 * Doc Comment Parser class.
 *
 * @example
 * for (let comment of node.leadingComments) {
 *   let tags = CommentParser.parse(comment);
 *   console.log(tags);
 * }
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CommentParser = (function () {
  function CommentParser() {
    _classCallCheck(this, CommentParser);
  }

  _createClass(CommentParser, null, [{
    key: 'parse',

    /**
     * parse comment to tags.
     * @param {ASTNode} commentNode - comment node.
     * @param {string} commentNode.value - comment body.
     * @param {string} commentNode.type - Block or Line.
     * @returns {Tag[]} parsed comment.
     */
    value: function parse(commentNode) {
      if (!this.isESDoc(commentNode)) return [];

      var comment = commentNode.value;

      // TODO: refactor
      comment = comment.replace(/\r\n/gm, '\n'); // for windows
      comment = comment.replace(/^\t*\s?/gm, ''); // remove trailing tab
      comment = comment.replace(/^\*\s?/, ''); // remove first '*'
      comment = comment.replace(/ $/, ''); // remove last ' '
      comment = comment.replace(/^ *\* ?/gm, ''); // remove line head '*'
      if (comment.charAt(0) !== '@') comment = '@desc ' + comment; // auto insert @desc
      comment = comment.replace(/\s*$/, ''); // remove tail space.
      comment = comment.replace(/^(@\w+)$/gm, '$1 \\TRUE'); // auto insert tag text to non-text tag (e.g. @interface)
      comment = comment.replace(/^(@\w+)\s(.*)/gm, '\\Z$1\\Z$2'); // insert separator (\\Z@tag\\Ztext)
      var lines = comment.split('\\Z');

      var tagName = '';
      var tagValue = '';
      var tags = [];
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.charAt(0) === '@') {
          tagName = line;
          var nextLine = lines[i + 1];
          if (nextLine.charAt(0) === '@') {
            tagValue = '';
          } else {
            tagValue = nextLine;
            i++;
          }
          tagValue = tagValue.replace('\\TRUE', '').replace(/^\n/, '').replace(/\n*$/, '');
          tags.push({ tagName: tagName, tagValue: tagValue });
        }
      }
      return tags;
    }
  }, {
    key: 'isESDoc',

    /**
     * judge doc comment or not.
     * @param {ASTNode} commentNode - comment node.
     * @returns {boolean} if true, this comment node is doc comment.
     */
    value: function isESDoc(commentNode) {
      if (commentNode.type !== 'Block') return false;
      return commentNode.value.charAt(0) === '*';
    }
  }]);

  return CommentParser;
})();

exports['default'] = CommentParser;
module.exports = exports['default'];