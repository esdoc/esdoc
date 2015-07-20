import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';
import {markdown} from './util.js';

/**
 * Index output builder class.
 */
export default class IndexDocBuilder extends DocBuilder {
  /**
   * create instance.
   * @param {Taffy} data - doc object database.
   * @param {ESDocConfig} config - use config to build output.
   * @param {CoverageObject} coverage - use coverage to build output.
   */
  constructor(data, config, coverage) {
    super(data, config);
    this._coverage = coverage;
  }

  /**
   * execute building output.
   * @param {function(html: string, filePath: string)} callback - is called with output.
   */
  exec(callback) {
    let ice = this._buildLayoutDoc();
    let title = this._getTitle();
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

    let html = this._readTemplate('index.html');
    let ice = new IceCap(html);
    let ext = path.extname(this._config.index);
    if (['.md', '.markdown'].includes(ext)) {
      ice.load('index', markdown(indexContent));
    } else {
      ice.load('index', indexContent);
    }

    let result = ice.html;
    if (this._config.coverage) {
      let $ = cheerio.load(result);
      $('.esdoc-coverage').html(this._buildCoverageHTML(this._coverage));
      result = $.root().html();
    }

    return result;
  }
}
