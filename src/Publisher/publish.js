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

export default function publish(values, asts, config) {
  IceCap.debug = !!config.debug;

  let dumpPath = path.resolve(config.destination, 'dump.json');
  fs.outputFileSync(dumpPath, JSON.stringify(values, null, 2));

  let data = taffy(values);
  let _coverage = null;

  function log(text) {
    console.log(text);
  }

  function writeHTML(html, fileName) {
    log(fileName);
    let filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, html, {encoding: 'utf8'});
  }

  function writeCoverage(coverage, fileName) {
    _coverage = coverage;
    let json = JSON.stringify(coverage, null, 2);
    let filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, json, {encoding: 'utf8'});
  }

  function writeAST(astJSON, fileName) {
    let filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, astJSON, {encoding: 'utf8'});
  }

  function copy(srcPath, destPath) {
    log(destPath);
    fs.copySync(srcPath, path.resolve(config.destination, destPath));
  }

  if (config.coverage) {
    new CoverageBuilder(data, config).exec(writeCoverage);
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

  if (config.test) {
    new TestDocBuilder(data, config).exec(writeHTML);
    new TestFileDocBuilder(data, config).exec(writeHTML);
  }

  if (config.coverage) {
    console.log('==================================');
    console.log(`Coverage: ${_coverage.coverage} (${_coverage.actualCount}/${_coverage.expectCount})`);
    console.log('==================================');
  }
};
