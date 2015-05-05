import fs from 'fs';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

/**
 * Identifier output builder class.
 */
export default class IdentifiersDocBuilder extends DocBuilder {
  /**
   * execute building output.
   * @param {function(html: string, filePath: string)} callback - is called with output.
   */
  exec(callback) {
    let ice = this._buildLayoutDoc();
    let title = this._getTitle('Index');
    ice.load('content', this._buildIdentifierDoc());
    ice.text('title', title, IceCap.MODE_WRITE);
    callback(ice.html, 'identifiers.html');
  }

  /**
   * build identifier output.
   * @return {IceCap} built output.
   * @private
   */
  _buildIdentifierDoc() {
    let indexInfo = this._getInfo();

    let ice = new IceCap(this._readTemplate('identifiers.html'));

    ice.text('title', indexInfo.title);
    ice.text('version', indexInfo.version, 'append');
    ice.text('url', indexInfo.url);
    ice.attr('url', 'href', indexInfo.url);
    ice.text('description', indexInfo.desc);

    ice.load('classSummary', this._buildSummaryHTML(null, 'class', 'Class Summary'), 'append');
    ice.load('interfaceSummary', this._buildSummaryHTML(null, 'interface', 'Interface Summary'), 'append');
    ice.load('functionSummary', this._buildSummaryHTML(null, 'function', 'Function Summary'), 'append');
    ice.load('variableSummary', this._buildSummaryHTML(null, 'variable', 'Variable Summary'), 'append');
    ice.load('typedefSummary', this._buildSummaryHTML(null, 'typedef', 'Typedef Summary'), 'append');

    return ice;
  }
}
