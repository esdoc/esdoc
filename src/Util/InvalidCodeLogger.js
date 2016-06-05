import fs from 'fs-extra';

/**
 * logger for invalid code which can not be parsed with ESDoc.
 */
class InvalidCodeLogger {

  /**
   * show log.
   * @param {string} filePath - invalid code in this file.
   * @param {ASTNode} [node] - fail parsing node.
   */
  show(filePath, node) {
    if (!node) {
      this.showFile(filePath);
      return;
    }

    let lines = fs.readFileSync(filePath).toString().split('\n');
    let targetLines = [];
    let start;
    let end = node.loc.start.line;

    if (node.leadingComments && node.leadingComments[0]) {
      start = node.leadingComments[0].loc.start.line;
    } else {
      start = Math.max(0, end - 10);
    }

    for (let i = start - 1; i < end; i++) {
      targetLines.push(`${i}| ` + lines[i]);
    }

    console.log('[31merror: could not process the following code.[32m');
    console.log(filePath);
    console.log(targetLines.join('\n'));
    console.log('[0m');
    console.trace();
  }

  /**
   * show log.
   * @param {string} filePath - invalid code in this file.
   * @param {Error} error - error object.
   */
  showFile(filePath, error) {
    const lines = fs.readFileSync(filePath).toString().split('\n');
    const start = Math.max(error.lineNumber - 3, 1);
    const end = Math.min(error.lineNumber + 3, lines.length);
    const targetLines = [];
    for (let i = start - 1; i < end; i++) {
      targetLines.push(`${i}| ` + lines[i]);
    }

    console.log('[31mwarning: could not parse the following code. if you want to use ES7, see esdoc-es7-plugin(https://github.com/esdoc/esdoc-es7-plugin)[32m'
     +'\n error: ' + error);
    console.log(filePath);
    console.log(targetLines.join('\n') + '[0m');
  }
}

/**
 * singleton for {@link InvalidCodeLogger}
 */
export default new InvalidCodeLogger();
