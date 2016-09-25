import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

/**
 * File output html builder class.
 */
export default class TestFileDocBuilder extends DocBuilder {
  /**
   * execute building output html.
   * @param {function(html: string, filePath: string)} callback - is called with each output.
   */
  exec(callback) {
    const ice = this._buildLayoutDoc();

    const docs = this._find({kind: 'testFile'});
    for (const doc of docs) {
      const fileName = this._getOutputFileName(doc);
      const baseUrl = this._getBaseUrl(fileName);
      const title = this._getTitle(doc);
      ice.load('content', this._buildFileDoc(doc), IceCap.MODE_WRITE);
      ice.attr('baseUrl', 'href', baseUrl, IceCap.MODE_WRITE);
      ice.text('title', title, IceCap.MODE_WRITE);
      callback(ice.html, fileName);
    }
  }

  /**
   * build file output html.
   * @param {DocObject} doc - target file doc object.
   * @returns {string} html of file output.
   * @private
   */
  _buildFileDoc(doc) {
    const ice = new IceCap(this._readTemplate('file.html'));
    ice.text('title', doc.longname);
    ice.text('content', doc.content);
    ice.drop('emptySourceCode', !!doc.content);
    return ice.html;
  }
}
