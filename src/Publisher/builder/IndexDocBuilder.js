import fs from 'fs';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

export default class IndexDocBuilder extends DocBuilder {
  exec(callback) {
    var ice = this._buildLayoutDoc();
    ice.load('content', this._buildIndexDoc());
    callback(ice.html, 'index.html');
  }

  _buildIndexDoc() {
    var indexInfo = this._getIndexInfo();

    var ice = new IceCap(this._readTemplate('index.html'));

    ice.text('title', indexInfo.title);
    ice.text('version', indexInfo.version, 'append');
    ice.text('url', indexInfo.url);
    ice.attr('url', 'href', indexInfo.url);
    ice.text('description', indexInfo.desc);

    ice.load('moduleSummary', this._buildSummaryHTML(null, 'module', 'Module Summary'), 'append');
    ice.load('namespaceSummary', this._buildSummaryHTML(null, 'namespace', 'Namespace Summary'), 'append');
    ice.load('classSummary', this._buildSummaryHTML(null, 'class', 'Class Summary'), 'append');
    ice.load('interfaceSummary', this._buildSummaryHTML(null, 'interface', 'Interface Summary'), 'append');
    ice.load('mixinSummary', this._buildSummaryHTML(null, 'mixin', 'Mixin Summary'), 'append');
    ice.load('fileSummary', this._buildSummaryHTML(null, 'file', 'File Summary'), 'append');

    return ice;
  }

  _getIndexInfo() {
    //if (this._config.configure) {
    //  var configPath = this._config.configure;
    //  var configJSON = fs.readFileSync(configPath, {encoding: 'utf-8'});
    //  var config = JSON.parse(configJSON);
    //}

    if (this._option.package) {
      var packagePath = this._option.package;
      var json = fs.readFileSync(packagePath, {encoding: 'utf-8'});
      var packageObj = JSON.parse(json);
    }

    if (this._config) {
      var config = this._config;
      var indexInfo = {
        title: config.cloudy.title || packageObj.name,
        desc: config.cloudy.description || packageObj.description,
        version: config.cloudy.version || packageObj.version,
        url: config.cloudy.url || packageObj.repository ? packageObj.repository.url : ''
      };
    }

    return indexInfo;
  }
}
