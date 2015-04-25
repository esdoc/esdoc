import fs from 'fs-extra';
import path from 'path';
import {taffy} from 'taffydb';
import StaticFileBuilder from './builder/StaticFileBuilder.js';
import SymbolsDocBuilder from './builder/SymbolsDocBuilder.js';
import ReadmeDocBuilder from './builder/ReadmeDocBuilder.js';
import ClassDocBuilder from './builder/ClassDocBuilder.js';
import SingleDocBuilder from './builder/SingleDocBuilder.js';
import FileDocBuilder from './builder/FileDocBuilder.js';
import SearchIndexBuilder from './builder/SearchIndexBuilder.js';
import CoverageBuilder from './builder/CoverageBuilder.js';
import ASTDocBuilder from './builder/ASTDocBuilder.js';

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
  new ReadmeDocBuilder(data, config, _coverage).exec(writeHTML);
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
