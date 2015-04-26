import fs from 'fs';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

export default class SymbolsDocBuilder extends DocBuilder {
  exec(callback) {
    let ice = this._buildLayoutDoc();
    ice.load('content', this._buildIndexDoc());
    callback(ice.html, 'symbols.html');
  }

  _buildIndexDoc() {
    let indexInfo = this._getInfo();

    let ice = new IceCap(this._readTemplate('symbols.html'));

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
