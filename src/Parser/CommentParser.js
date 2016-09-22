/**
 * Doc Comment Parser class.
 *
 * @example
 * for (let comment of node.leadingComments) {
 *   let tags = CommentParser.parse(comment);
 *   console.log(tags);
 * }
 */
export default class CommentParser {
  /**
   * parse comment to tags.
   * @param {ASTNode} commentNode - comment node.
   * @param {string} commentNode.value - comment body.
   * @param {string} commentNode.type - CommentBlock or CommentLine.
   * @returns {Tag[]} parsed comment.
   */
  static parse(commentNode) {
    if (!this.isESDoc(commentNode)) return [];

    let comment = commentNode.value;

    // TODO: refactor
    comment = comment.replace(/\r\n/gm, '\n'); // for windows
    comment = comment.replace(/^[\t ]*/gm, ''); // remove line head space
    comment = comment.replace(/^\*[\t ]?/, ''); // remove first '*'
    comment = comment.replace(/[\t ]$/, ''); // remove last space
    comment = comment.replace(/^\*[\t ]?/gm, ''); // remove line head '*'
    if (comment.charAt(0) !== '@') comment = '@desc ' + comment; // auto insert @desc
    comment = comment.replace(/[\t ]*$/, ''); // remove tail space.
    comment = comment.replace(/^[\t ]*(@\w+)$/gm, '$1 \\TRUE'); // auto insert tag text to non-text tag (e.g. @interface)
    comment = comment.replace(/^[\t ]*(@\w+)[\t ](.*)/gm, '\\Z$1\\Z$2'); // insert separator (\\Z@tag\\Ztext)
    let lines = comment.split('\\Z');

    let tagName = '';
    let tagValue = '';
    let tags = [];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (line.charAt(0) === '@') {
        tagName = line;
        let nextLine = lines[i + 1];
        if (nextLine.charAt(0) === '@') {
          tagValue = '';
        } else {
          tagValue = nextLine;
          i++;
        }
        tagValue = tagValue.replace('\\TRUE', '').replace(/^\n/, '').replace(/\n*$/, '');
        tags.push({tagName, tagValue});
      }
    }
    return tags;
  }

  /**
   * judge doc comment or not.
   * @param {ASTNode} commentNode - comment node.
   * @returns {boolean} if true, this comment node is doc comment.
   */
  static isESDoc(commentNode) {
    if (commentNode.type !== 'CommentBlock') return false;
    return commentNode.value.charAt(0) === '*';
  }
}
