import path from 'path';
import fs from 'fs';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';
import {dateForUTC} from './util.js';

export default class SourceDocBuilder extends DocBuilder {
  constructor(data, config, coverage) {
    super(data, config);
    this._coverage = coverage;
  }

  exec(callback) {
    let ice = this._buildLayoutDoc();
    let fileName = 'source.html';
    let baseUrl = this._getBaseUrl(fileName);
    let title = this._getTitle('Source');

    ice.attr('baseUrl', 'href', baseUrl);
    ice.load('content', this._buildFilesHTML());
    ice.text('title', title, IceCap.MODE_WRITE);

    callback(ice.html, fileName);
  }

  _buildFilesHTML() {
    let ice = new IceCap(this._readTemplate('source.html'));
    let docs = this._find({kind: 'file'});
    let config = this._config;
    let useCoverage = this._config.coverage;
    let coverage;
    if (useCoverage) coverage = this._coverage.files;

    ice.attr('files', 'data-use-coverage', !!useCoverage);
    ice.loop('file', docs, (i, doc, ice)=>{
      let filePath = doc.longname;
      let absFilePath = path.resolve(path.dirname(config.source), filePath);
      let content = fs.readFileSync(absFilePath).toString();
      let lines = content.split('\n').length - 1;
      let stat = fs.statSync(absFilePath);
      let date = dateForUTC(stat.ctime);
      let ratio;
      if (useCoverage && coverage[filePath]) {
        ratio = Math.floor(100 * coverage[filePath].actualCount / coverage[filePath].expectCount);
      } else {
        ratio = 100;
      }

      ice.load('filePath', this._buildFileDocLinkHTML(doc));
      ice.text('coverage', `${ratio} %`);
      ice.text('lines', lines);
      ice.text('updated', date);
      ice.text('size', `${stat.size} byte`);
    });
    return ice.html;
  }
}
