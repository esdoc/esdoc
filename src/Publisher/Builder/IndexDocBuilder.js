import fs from 'fs';
import path from 'path';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';
import {markdown} from './util.js';

/**
 * Index output builder class.
 */
export default class IndexDocBuilder extends DocBuilder {
  /**
   * execute building output.
   * @param {function(html: string, filePath: string)} callback - is called with output.
   */
  exec(callback) {
    const ice = this._buildLayoutDoc();
    const title = this._getTitle();
    ice.load('content', this._buildIndexDoc());
    ice.text('title', title, IceCap.MODE_WRITE);
    callback(ice.html, 'index.html');
  }

  /**
   * build index output.
   * @returns {string} html of index output.
   * @private
   */
  _buildIndexDoc() {
    if (!this._config.index) return 'Please create README.md';

    let indexContent;
    try {
      indexContent = fs.readFileSync(this._config.index, {encode: 'utf8'}).toString();
    } catch (e) {
      return 'Please create README.md';
    }

    const html = this._readTemplate('index.html');
    const ice = new IceCap(html);
    const ext = path.extname(this._config.index);
    if (['.md', '.markdown'].includes(ext)) {
      ice.load('index', markdown(indexContent));
    } else {
      ice.load('index', indexContent);
    }

    return ice.html;
  }
}
