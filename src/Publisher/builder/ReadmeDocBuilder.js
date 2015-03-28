import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

export default class ReadmeDocBuilder extends DocBuilder {
  exec(callback) {
    var ice = this._buildLayoutDoc();
    ice.load('content', this._buildReadmeDoc());
    callback(ice.html, '@readme.html');
  }

  _buildReadmeDoc() {
    var html = this._readTemplate('readme.html');
    var ice = new IceCap(html);
    ice.load('readme', this._option.readme);

    return ice;
  }
}
