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

    // create badge
    let ratio = Math.floor(100 * actualCount / expectCount);
    let color;
    if (ratio < 50) {
      color = '#db654f';
    } else if (coverage < 90) {
      color = '#dab226';
    } else {
      color = '#4fc921';
    }
    let badge = this._readTemplate('image/badge.svg');
    badge = badge.replace(/@ratio@/g, ratio + '%');
    badge = badge.replace(/@color@/g, color);
    badgeCallback(badge, 'badge.svg');
  }
}
