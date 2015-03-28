import fs from 'fs-extra';
import path from 'path';
import StaticFileBuilder from './builder/StaticFileBuilder.js';
import IndexDocBuilder from './builder/IndexDocBuilder.js';
import ReadmeDocBuilder from './builder/ReadmeDocBuilder.js';
import ObjectDocBuilder from './builder/ObjectDocBuilder.js';
import SearchIndexBuilder from './builder/SearchIndexBuilder.js';

export default function publish(data, config) {
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
  new ObjectDocBuilder(data, config).exec(writeHTML);
  new StaticFileBuilder(data, config).exec(copy);
  new SearchIndexBuilder(data, config).exec(writeHTML);
};
