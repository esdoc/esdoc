import fs from 'fs';
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
    ice.load('content', this._buildReadmeDoc());
    callback(ice.html, 'index.html');
  }

  _buildReadmeDoc() {
    if (!this._config.readme) return 'NO README';

    let readme = fs.readFileSync(this._config.readme, {encode: 'utf8'}).toString();

    let html = this._readTemplate('readme.html');
    let ice = new IceCap(html);
    ice.load('readme', markdown(readme));

    let result = ice.html;
    if (this._config.coverage) {
      let $ = cheerio.load(result);
      $('.esdoc-coverage').html(this._buildCoverageHTML());
      result = $.root().html();
    }

    return result;
  }

  _buildCoverageHTML() {
    let coverage = Math.floor(100 * this._coverage.actualCount / this._coverage.expectCount);
    let colorClass;
    if (coverage < 50) {
      colorClass = 'esdoc-coverage-low';
    } else if (coverage < 90) {
      colorClass = 'esdoc-coverage-middle';
    } else {
      colorClass = 'esdoc-coverage-high';
    }

    let html = `<a href="https://esdoc.org" class="esdoc-coverage-wrap">
    <span class="esdoc-coverage-label">document</span><span class="esdoc-coverage-ratio ${colorClass}">${coverage}%</span>
    </a>`;

    return html;
  }
}
