import fs from 'fs-extra';
import path from 'path';
import {taffy} from 'taffydb';
import StaticFileBuilder from './Builder/StaticFileBuilder.js';
import SymbolsDocBuilder from './Builder/SymbolsDocBuilder.js';
import IndexDocBuilder from './Builder/IndexDocBuilder.js';
import ClassDocBuilder from './Builder/ClassDocBuilder.js';
import SingleDocBuilder from './Builder/SingleDocBuilder.js';
import FileDocBuilder from './Builder/FileDocBuilder.js';
import SearchIndexBuilder from './Builder/SearchIndexBuilder.js';
import CoverageBuilder from './Builder/CoverageBuilder.js';
import ASTDocBuilder from './Builder/ASTDocBuilder.js';

export default function publish(values, asts, config) {
  let dumpPath = path.resolve(config.destination, 'dump.json');
  fs.outputFileSync(dumpPath, JSON.stringify(values, null, 2));

  let data = taffy(values);
  let _coverage = null;

  function writeHTML(html, fileName) {
    console.log(fileName);
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
    console.log(destPath);
    fs.copySync(srcPath, path.resolve(config.destination, destPath));
  }

  if (config.coverage) {
    new CoverageBuilder(data, config).exec(writeCoverage);
  }

  new SymbolsDocBuilder(data, config).exec(writeHTML);
  new IndexDocBuilder(data, config, _coverage).exec(writeHTML);
  new ClassDocBuilder(data, config).exec(writeHTML);
  new SingleDocBuilder(data, config).exec(writeHTML);
  new FileDocBuilder(data, config).exec(writeHTML);
  new StaticFileBuilder(data, config).exec(copy);
  new SearchIndexBuilder(data, config).exec(writeHTML);
  new ASTDocBuilder(data, asts, config).exec(writeAST);

  if (config.coverage) {
    console.log('==================================');
    console.log('Coverage');
    console.log(_coverage);
    console.log('==================================');
  }
};
