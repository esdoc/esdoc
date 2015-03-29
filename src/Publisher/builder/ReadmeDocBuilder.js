import fs from 'fs';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';
import {markdown} from './util.js';

export default class ReadmeDocBuilder extends DocBuilder {
  exec(callback) {
    var ice = this._buildLayoutDoc();
    ice.load('content', this._buildReadmeDoc());
    callback(ice.html, 'index.html');
  }

  _buildReadmeDoc() {
    if (!this._config.readme) return '';

    let readme = fs.readFileSync(this._config.readme, {encode: 'utf8'}).toString();

    var html = this._readTemplate('@readme.html');
    var ice = new IceCap(html);
    ice.load('readme', markdown(readme));

    return ice;
  }
}
