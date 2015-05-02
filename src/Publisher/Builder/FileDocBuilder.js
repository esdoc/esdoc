import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

export default class FileDocBuilder extends DocBuilder {
  exec(callback) {
    let ice = this._buildLayoutDoc();

    let docs = this._find({kind: 'file'});
    for (let doc of docs) {
      let fileName = this._getOutputFileName(doc);
      let baseUrl = this._getBaseUrl(fileName);
      let title = this._getTitle(doc);
      ice.load('content', this._buildFileDoc(doc), IceCap.MODE_WRITE);
      ice.attr('baseUrl', 'href', baseUrl, IceCap.MODE_WRITE);
      ice.text('title', title, IceCap.MODE_WRITE);
      callback(ice.html, fileName);
    }
  }

  _buildFileDoc(doc) {
    let ice = new IceCap(this._readTemplate('file.html'));
    ice.text('title', doc.longname);
    ice.text('content', doc.content);
    return ice.html;
  }
}
