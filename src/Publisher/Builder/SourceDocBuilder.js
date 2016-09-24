import path from 'path';
import fs from 'fs';
import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';
import {dateForUTC} from './util.js';

/**
 * Source output html builder class.
 */
export default class SourceDocBuilder extends DocBuilder {
  /**
   * create instance.
   * @param {Taffy} data - doc object database.
   * @param {ESDocConfig} config - use config to build output.
   * @param {CoverageObject} coverage - use coverage to build output.
   */
  constructor(data, config, coverage) {
    super(data, config);
    this._coverage = coverage;
  }

  /**
   * execute building output html.
   * @param {function(html: string, filePath: string)} callback - is called with output html.
   */
  exec(callback) {
    const ice = this._buildLayoutDoc();
    const fileName = 'source.html';
    const baseUrl = this._getBaseUrl(fileName);
    const title = this._getTitle('Source');

    ice.attr('baseUrl', 'href', baseUrl);
    ice.load('content', this._buildSourceHTML());
    ice.text('title', title, IceCap.MODE_WRITE);

    callback(ice.html, fileName);
  }

  /**
   * build source list output html.
   * @returns {string} html of source list.
   * @private
   */
  _buildSourceHTML() {
    const ice = new IceCap(this._readTemplate('source.html'));
    const docs = this._find({kind: 'file'});
    const config = this._config;
    const useCoverage = this._config.coverage;
    let coverage;
    if (useCoverage) coverage = this._coverage.files;

    ice.drop('coverageBadge', !useCoverage);
    ice.attr('files', 'data-use-coverage', !!useCoverage);

    if (useCoverage) {
      const actual = this._coverage.actualCount;
      const expect = this._coverage.expectCount;
      const coverageCount = `${actual}/${expect}`;
      ice.text('totalCoverageCount', coverageCount);
    }

    ice.loop('file', docs, (i, doc, ice)=>{
      const sourceDirPath = path.resolve(config.source);
      const filePath = doc.longname;
      const absFilePath = path.resolve(path.dirname(sourceDirPath), filePath);
      const content = fs.readFileSync(absFilePath).toString();
      const lines = content.split('\n').length - 1;
      const stat = fs.statSync(absFilePath);
      const date = dateForUTC(stat.ctime);
      let coverageRatio;
      let coverageCount;
      let undocumentLines;
      if (useCoverage && coverage[filePath]) {
        const actual = coverage[filePath].actualCount;
        const expect = coverage[filePath].expectCount;
        coverageRatio = `${Math.floor(100 * actual / expect)} %`;
        coverageCount = `${actual}/${expect}`;
        undocumentLines = coverage[filePath].undocumentLines.sort().join(',');
      } else {
        coverageRatio = '-';
      }

      const identifierDocs = this._find({
        longname: {left: `${doc.longname}~`},
        kind: ['class', 'function', 'variable']
      });
      const identifiers = identifierDocs.map(doc =>{
        return this._buildDocLinkHTML(doc.longname);
      });

      if (undocumentLines) {
        const url = this._getURL(doc);
        const link = this._buildFileDocLinkHTML(doc).replace(/href=".*\.html"/, `href="${url}#errorLines=${undocumentLines}"`);
        ice.load('filePath', link);
      } else {
        ice.load('filePath', this._buildFileDocLinkHTML(doc));
      }
      ice.text('coverage', coverageRatio);
      ice.text('coverageCount', coverageCount);
      ice.text('lines', lines);
      ice.text('updated', date);
      ice.text('size', `${stat.size} byte`);
      ice.load('identifier', identifiers.join('\n') || '-');
    });
    return ice.html;
  }
}
