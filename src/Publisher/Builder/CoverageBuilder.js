import path from 'path';
import DocBuilder from './DocBuilder.js';

/**
 * Coverage output builder class.
 */
export default class CoverageBuilder extends DocBuilder {
  /**
   * execute building output.
   * @param {function(coverage: CoverageObject, filePath: string)} callback - is called with coverage.
   */
  exec(callback) {
    let docs = this._find({kind: ['class', 'method', 'member', 'get', 'set', 'constructor', 'function', 'variable']});
    let expectCount = docs.length;
    let actualCount = 0;
    let files = {};

    for (let doc of docs) {
      let filePath = doc.longname.split('~')[0];
      if (!files[filePath]) files[filePath] = {expectCount: 0, actualCount: 0};
      files[filePath].expectCount++;

      if (!doc.undocument) {
        actualCount++;
        files[filePath].actualCount++;
      }
    }

    let coverage = {
      coverage: `${Math.floor(10000 * actualCount / expectCount) / 100 }%`,
      expectCount: expectCount,
      actualCount: actualCount,
      files: files
    };

    callback(coverage, 'coverage.json');
  }
}
