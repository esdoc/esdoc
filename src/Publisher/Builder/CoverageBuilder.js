import path from 'path';
import DocBuilder from './DocBuilder.js';

/**
 * Coverage output builder class.
 */
export default class CoverageBuilder extends DocBuilder {
  /**
   * execute building output.
   * @param {function(coverage: CoverageObject, filePath: string)} callback - is called with coverage.
   * @param {function(badge: string, filePath: string)} badgeCallback - is called with coverage badge.
   */
  exec(callback, badgeCallback) {
    let docs = this._find({kind: ['class', 'method', 'member', 'get', 'set', 'constructor', 'function', 'variable']});
    let expectCount = docs.length;
    let actualCount = 0;
    let files = {};

    for (let doc of docs) {
      let filePath = doc.longname.split('~')[0];
      if (!files[filePath]) files[filePath] = {expectCount: 0, actualCount: 0, undocumentLines: []};
      files[filePath].expectCount++;

      if (!doc.undocument) {
        actualCount++;
        files[filePath].actualCount++;
      } else {
        files[filePath].undocumentLines.push(doc.lineNumber);
      }
    }

    let coveragePercent = (expectCount === 0 ? 0 : Math.floor(10000 * actualCount / expectCount) / 100);

    let coverage = {
      coverage: `${coveragePercent}%`,
      expectCount: expectCount,
      actualCount: actualCount,
      files: files
    };

    callback(coverage, 'coverage.json');

    // create badge
    let ratio = Math.floor(100 * actualCount / expectCount);
    let color;
    if (ratio < 50) {
      color = '#db654f';
    } else if (ratio < 90) {
      color = '#dab226';
    } else {
      color = '#4fc921';
    }
    let badge = this._readTemplate(`image/${this._config.badge}.svg`);
    badge = badge.replace(/@ratio@/g, ratio + '%');
    badge = badge.replace(/@color@/g, color);
    badgeCallback(badge, 'badge.svg');
  }
}
