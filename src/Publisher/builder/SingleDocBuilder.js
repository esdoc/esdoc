import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

export default class SingleDocBuilder extends DocBuilder {
  exec(callback) {
    var ice = this._buildLayoutDoc();
    ice.autoClose = false;

    let kinds = ['function', 'variable', 'typedef'];
    for (let kind of kinds) {
      var docs = this._find({kind: kind});
      if (!docs.length) return;
      ice.load('content', this._buildSingleDoc(kind), IceCap.MODE_WRITE);
      var fileName = this._getOutputFileName(docs[0]);
      callback(ice.html, fileName);
    }
  }

  _buildSingleDoc(kind) {
    let title = kind.replace(/^(\w)/, (c)=> c.toUpperCase() );
    var ice = new IceCap(this._readTemplate('@single.html'));
    ice.text('title', title);
    ice.load('summary', this._buildSummaryHTML(null, kind, 'Summary'), 'append');
    ice.load('detail', this._buildDetailHTML(null, kind, ''));
    return ice.html;
  }
}
