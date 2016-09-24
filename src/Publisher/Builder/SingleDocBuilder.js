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
    const ice = this._buildLayoutDoc();
    ice.autoClose = false;

    const kinds = ['function', 'variable', 'typedef'];
    for (const kind of kinds) {
      const docs = this._find({kind: kind});
      if (!docs.length) continue;
      const fileName = this._getOutputFileName(docs[0]);
      const baseUrl = this._getBaseUrl(fileName);
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
    const title = kind.replace(/^(\w)/, (c)=> c.toUpperCase());
    const ice = new IceCap(this._readTemplate('single.html'));
    ice.text('title', title);
    ice.load('summaries', this._buildSummaryHTML(null, kind, 'Summary'), 'append');
    ice.load('details', this._buildDetailHTML(null, kind, ''));
    return ice.html;
  }
}
