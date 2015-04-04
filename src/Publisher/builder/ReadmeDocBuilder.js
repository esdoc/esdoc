import fs from 'fs';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';
import {markdown} from './util.js';

export default class ReadmeDocBuilder extends DocBuilder {
  exec(callback) {
    let ice = this._buildLayoutDoc();
    ice.load('content', this._buildReadmeDoc());
    callback(ice.html, 'index.html');
  }

  _buildReadmeDoc() {
    if (!this._config.readme) return 'NO README';

    let readme = fs.readFileSync(this._config.readme, {encode: 'utf8'}).toString();

    let html = this._readTemplate('@readme.html');
    let ice = new IceCap(html);
    ice.load('readme', markdown(readme));

    return ice;
  }
}
