import fs from 'fs-extra';
import path from 'path';
import {taffy} from 'taffydb';
import IceCap from 'ice-cap';
import StaticFileBuilder from './Builder/StaticFileBuilder.js';
import IdentifiersDocBuilder from './Builder/IdentifiersDocBuilder.js';
import IndexDocBuilder from './Builder/IndexDocBuilder.js';
import ClassDocBuilder from './Builder/ClassDocBuilder.js';
import SingleDocBuilder from './Builder/SingleDocBuilder.js';
import FileDocBuilder from './Builder/FileDocBuilder.js';
import SearchIndexBuilder from './Builder/SearchIndexBuilder.js';
import CoverageBuilder from './Builder/CoverageBuilder.js';
import ASTDocBuilder from './Builder/ASTDocBuilder.js';
import SourceDocBuilder from './Builder/SourceDocBuilder.js';
import TestDocBuilder from './Builder/TestDocBuilder.js';
import TestFileDocBuilder from './Builder/TestFileDocBuilder.js';
import Plugin from '../Plugin/Plugin.js';

/**
 * publish document as HTML.
 * @param {DocObject[]} values - all doc objects.
 * @param {AST[]} asts - all ASTs.
 * @param {ESDocConfig} config - ESDoc config object.
 */
export default function publish(values, asts, config) {
  IceCap.debug = !!config.debug;

  if (!config.includeSource) {
    for (let value of values) {
      if (['file', 'testFile'].includes(value.kind) && 'content' in value) {
        value.content = '';
      }
    }
  }

  let dumpPath = path.resolve(config.destination, 'dump.json');
  fs.outputFileSync(dumpPath, JSON.stringify(values, null, 2));

  let data = taffy(values);
  let _coverage = null;
  let _counter = {
    html : 0,
    badge: 0,
    copy : 0
  };

  function log(text, counterKey) {
    if (counterKey) {
      _counter[counterKey]++;
    }

    if (config.verbose || !counterKey) {
      console.log(text);
    }
  }

  function writeHTML(html, fileName) {
    log(fileName, 'html');
    html = Plugin.onHandleHTML(html);
    let filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, html, {encoding: 'utf8'});
  }

  function writeCoverage(coverage, fileName) {
    _coverage = coverage;
    let json = JSON.stringify(coverage, null, 2);
    let filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, json, {encoding: 'utf8'});
  }

  function writeBadge(badge, fileName) {
    log(fileName, 'badge');
    let filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, badge, {encoding: 'utf8'});
  }

  function writeAST(astJSON, fileName) {
    let filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, astJSON, {encoding: 'utf8'});
  }

  function copy(srcPath, destPath) {
    log(destPath, 'copy');
    fs.copySync(srcPath, path.resolve(config.destination, destPath));
  }

  if (config.coverage) {
    new CoverageBuilder(data, config).exec(writeCoverage, writeBadge);
  }

  new IdentifiersDocBuilder(data, config).exec(writeHTML);
  new IndexDocBuilder(data, config, _coverage).exec(writeHTML);
  new ClassDocBuilder(data, config).exec(writeHTML);
  new SingleDocBuilder(data, config).exec(writeHTML);
  new FileDocBuilder(data, config).exec(writeHTML);
  new StaticFileBuilder(data, config).exec(copy);
  new SearchIndexBuilder(data, config).exec(writeHTML);
  new ASTDocBuilder(data, asts, config).exec(writeAST);
  new SourceDocBuilder(data, config, _coverage).exec(writeHTML);

  // package.json
  try {
    const json = fs.readFileSync(config.package, {encoding: 'utf-8'});
    let filePath = path.resolve(config.destination, 'package.json');
    fs.outputFileSync(filePath, json, {encoding: 'utf8'});
  } catch (e) {
    // ignore
  }

  if (config.test) {
    new TestDocBuilder(data, config).exec(writeHTML);
    new TestFileDocBuilder(data, config).exec(writeHTML);
  }

  if (config.coverage) {
    console.log('==================================');
    console.log(`Coverage: ${_coverage.coverage} (${_coverage.actualCount}/${_coverage.expectCount})`);
    console.log('==================================');
  }

  if (!config.verbose) {
    const reportHtml  = `${_counter.html} HTML file${_counter.html && _counter.html > 1 ? 's' : ''}`;
    const reportBadge = `${_counter.badge} badge${_counter.badge && _counter.badge > 1 ? 's' : ''}`;
    const reportCopy  = `${_counter.copy} file${_counter.copy && _counter.copy > 1 ? 's were' : ' was'}`;

    console.log(`Total ${reportHtml} and ${reportBadge} were created, ${reportCopy} copied`);
  }
};
