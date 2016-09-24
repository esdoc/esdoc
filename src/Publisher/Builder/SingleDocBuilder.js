import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

/**
 * Single output builder class.
 * "single" means function, variable, typedef, external, etc...
 */
export default class SingleDocBuilder extends DocBuilder {
  /**
   * execute building output.
   * @param {function(html: string, filePath: string)} callback - is called with output.
   */
  exec(callback) {
    let ice = this._buildLayoutDoc();
    ice.autoClose = false;

    let kinds = ['function', 'variable', 'typedef'];
    for (let kind of kinds) {
      let docs = this._find({kind: kind});
      if (!docs.length) continue;
      let fileName = this._getOutputFileName(docs[0]);
      let baseUrl = this._getBaseUrl(fileName);
      let title = kind.replace(/^(\w)/, (c)=> c.toUpperCase());
      title = this._getTitle(title);

      ice.load('content', this._buildSingleDoc(kind), IceCap.MODE_WRITE);
      ice.attr('baseUrl', 'href', baseUrl, IceCap.MODE_WRITE);
      ice.text('title', title, IceCap.MODE_WRITE);
      callback(ice.html, fileName);
    }
  }

  /**
   * build single output.
   * @param {string} kind - target kind property.
   * @returns {string} html of single output
   * @private
   */
  _buildSingleDoc(kind) {
    let title = kind.replace(/^(\w)/, (c)=> c.toUpperCase());
    let ice = new IceCap(this._readTemplate('single.html'));
    ice.text('title', title);
    ice.load('summaries', this._buildSummaryHTML(null, kind, 'Summary'), 'append');
    ice.load('details', this._buildDetailHTML(null, kind, ''));
    return ice.html;
  }
}
