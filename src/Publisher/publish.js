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
import ASTDocBuilder from './Builder/ASTDocBuilder.js';
import SourceDocBuilder from './Builder/SourceDocBuilder.js';
import TestDocBuilder from './Builder/TestDocBuilder.js';
import TestFileDocBuilder from './Builder/TestFileDocBuilder.js';
import ManualDocBuilder from './Builder/ManualDocBuilder.js';
import Plugin from '../Plugin/Plugin.js';

/**
 * publish document as HTML.
 * @param {DocObject[]} values - all doc objects.
 * @param {AST[]} asts - all ASTs.
 * @param {ESDocConfig} config - ESDoc config object.
 */
export default function publish(values, asts, config) {
  IceCap.debug = !!config.debug;

  const dumpPath = path.resolve(config.destination, 'dump.json');
  fs.outputFileSync(dumpPath, JSON.stringify(values, null, 2));

  const data = taffy(values);

  function log(text) {
    console.log(text);
  }

  function writeHTML(html, fileName) {
    log(`output: ${fileName}`);
    html = Plugin.onHandleHTML(html, fileName);
    const filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, html, {encoding: 'utf8'});
  }

  function writeBadge(badge, fileName) {
    log(`output: ${fileName}`);
    const filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, badge, {encoding: 'utf8'});
  }

  function writeAST(astJSON, fileName) {
    const filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, astJSON, {encoding: 'utf8'});
  }

  function copy(srcPath, destPath) {
    log(`output: ${destPath}`);
    fs.copySync(srcPath, path.resolve(config.destination, destPath));
  }

  let coverage = null;
  try {
    const filePath = path.resolve(config.destination, 'coverage.json');
    const tmp = fs.readFileSync(filePath).toString();
    coverage = JSON.parse(tmp);
  } catch (e) {
    // nothing
  }

  new IdentifiersDocBuilder(data, config).exec(writeHTML);
  new IndexDocBuilder(data, config).exec(writeHTML);
  new ClassDocBuilder(data, config).exec(writeHTML);
  new SingleDocBuilder(data, config).exec(writeHTML);
  new FileDocBuilder(data, config).exec(writeHTML);
  new StaticFileBuilder(data, config).exec(copy);
  new SearchIndexBuilder(data, config).exec(writeHTML);
  new ASTDocBuilder(data, asts, config).exec(writeAST);
  new SourceDocBuilder(data, config, coverage).exec(writeHTML);
  new ManualDocBuilder(data, config).exec(writeHTML, copy, writeBadge);

  // package.json
  try {
    const json = fs.readFileSync(config.package, {encoding: 'utf-8'});
    const filePath = path.resolve(config.destination, 'package.json');
    fs.outputFileSync(filePath, json, {encoding: 'utf8'});
  } catch (e) {
    // ignore
  }

  if (config.test) {
    new TestDocBuilder(data, config).exec(writeHTML);
    new TestFileDocBuilder(data, config).exec(writeHTML);
  }
}
