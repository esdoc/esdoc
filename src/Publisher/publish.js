import fs from 'fs-extra';
import path from 'path';
import {taffy} from 'taffydb';
import StaticFileBuilder from './builder/StaticFileBuilder.js';
import IndexDocBuilder from './builder/IndexDocBuilder.js';
import ReadmeDocBuilder from './builder/ReadmeDocBuilder.js';
//import ObjectDocBuilder from './builder/ObjectDocBuilder.js';
import ClassDocBuilder from './builder/ClassDocBuilder.js';
import SingleDocBuilder from './builder/SingleDocBuilder.js';
import FileDocBuilder from './builder/FileDocBuilder.js';
import SearchIndexBuilder from './builder/SearchIndexBuilder.js';

export default function publish(values, config) {
  let data = taffy(values);

  function writeHTML(html, fileName) {
    console.log(fileName);
    var filePath = path.resolve(config.destination, fileName);
    fs.outputFileSync(filePath, html, {encoding: 'utf8'});
  }

  function copy(srcPath, destPath) {
    console.log(destPath);
    fs.copySync(srcPath, path.resolve(config.destination, destPath));
  }

  new IndexDocBuilder(data, config).exec(writeHTML);
  new ReadmeDocBuilder(data, config).exec(writeHTML);
  //new ObjectDocBuilder(data, config).exec(writeHTML);
  new ClassDocBuilder(data, config).exec(writeHTML);
  new SingleDocBuilder(data, config).exec(writeHTML);
  new FileDocBuilder(data, config).exec(writeHTML);
  new StaticFileBuilder(data, config).exec(copy);
  new SearchIndexBuilder(data, config).exec(writeHTML);
};
