import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

export default class SingleDocBuilder extends DocBuilder {
  exec(callback) {
    let ice = this._buildLayoutDoc();
    ice.autoClose = false;

    let kinds = ['function', 'variable', 'typedef'];
    for (let kind of kinds) {
      let docs = this._find({kind: kind});
      if (!docs.length) return;
      ice.load('content', this._buildSingleDoc(kind), IceCap.MODE_WRITE);
      let fileName = this._getOutputFileName(docs[0]);
      callback(ice.html, fileName);
    }
  }

  _buildSingleDoc(kind) {
    let title = kind.replace(/^(\w)/, (c)=> c.toUpperCase() );
    let ice = new IceCap(this._readTemplate('@single.html'));
    ice.text('title', title);
    ice.load('summaries', this._buildSummaryHTML(null, kind, 'Summary'), 'append');
    ice.load('details', this._buildDetailHTML(null, kind, ''));
    return ice.html;
  }
}
