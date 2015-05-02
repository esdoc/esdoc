import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';
import {markdown} from './util.js';

export default class IndexDocBuilder extends DocBuilder {
  constructor(data, config, coverage) {
    super(data, config);
    this._coverage = coverage;
  }

  exec(callback) {
    let ice = this._buildLayoutDoc();
    let title = this._getTitle();
    ice.load('content', this._buildIndexDoc());
    ice.text('title', title, IceCap.MODE_WRITE);
    callback(ice.html, 'index.html');
  }

  _buildIndexDoc() {
    if (!this._config.index) return 'API Document';

    let indexContent = fs.readFileSync(this._config.index, {encode: 'utf8'}).toString();

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
