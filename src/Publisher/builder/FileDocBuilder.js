import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

export default class FileDocBuilder extends DocBuilder {
  exec(callback) {
    var ice = this._buildLayoutDoc();
    ice.autoClose = false;

    let docs = this._find({kind: 'file'});
    for (let doc of docs) {
      ice.load('content', this._buildFileDoc(doc), IceCap.MODE_WRITE);
      var fileName = this._getOutputFileName(doc);
      callback(ice.html, fileName);
    }
  }

  _buildFileDoc(doc) {
    var ice = new IceCap(this._readTemplate('@file.html'));
    ice.text('title', doc.longname);
    ice.load('content', doc.content);
    return ice.html;
  }
}
