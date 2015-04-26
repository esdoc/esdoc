import path from 'path';
import DocBuilder from './DocBuilder.js';

export default class CoverageBuilder extends DocBuilder {
  exec(callback) {
    let docs = this._find({kind: ['class', 'method', 'member', 'get', 'set', 'constructor', 'function', 'variable']});
    let expectCount = docs.length;
    let actualCount = 0;

    for (let doc of docs) {
      if (!doc.undocument) actualCount++;
    }

    let coverage = {
      coverage: `${Math.floor(10000 * actualCount / expectCount) / 100 }%`,
      expectCount: expectCount,
      actualCount: actualCount
    };

    callback(coverage, 'coverage.json');
  }
}
