import fs from 'fs';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

export default class IndexDocBuilder extends DocBuilder {
  exec(callback) {
    var ice = this._buildLayoutDoc();
    ice.load('content', this._buildIndexDoc());
    callback(ice.html, '@index.html');
  }

  _buildIndexDoc() {
    var indexInfo = this._getIndexInfo();

    var ice = new IceCap(this._readTemplate('@index.html'));

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
    ice.load('fileSummary', this._buildSummaryHTML(null, 'file', 'File Summary'), 'append');

    return ice;
  }

  _getIndexInfo() {
    var config = this._config;
    if (config.package) {
      var packagePath = config.package;
      var json = fs.readFileSync(packagePath, {encoding: 'utf-8'});
      var packageObj = JSON.parse(json);
    }

    var indexInfo = {
      title: config.title || packageObj.name,
      desc: config.description || packageObj.description,
      version: config.version || packageObj.version,
      url: config.url || packageObj.repository ? packageObj.repository.url : ''
    };

    return indexInfo;
  }
}
