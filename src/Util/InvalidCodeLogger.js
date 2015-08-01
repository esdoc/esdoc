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
  }

  /**
   * show log.
   * @param {string} filePath - invalid code in this file.
   */
  showFile(filePath) {
    console.log(`[31merror: could not parse ${filePath}[0m`);
  }
}

/**
 * singleton for {@link InvalidCodeLogger}
 */
export default new InvalidCodeLogger();
