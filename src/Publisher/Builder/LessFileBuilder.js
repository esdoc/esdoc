import fs from 'fs';
import path from 'path';
import less from 'less';
import DocBuilder from './DocBuilder.js';

/**
 * Less file output builder class.
 */
export default class LessFileBuilder extends DocBuilder {
  /**
   * execute build output.
   */
  exec() {
    const theme = this._config.theme || 'default';
    const inputFile = `style-${theme}.less`;
    const inputDir = path.resolve(__dirname, './template/less');
    const outputCss = path.resolve(this._config.destination, './css/style.css');
    const outputMap = path.resolve(this._config.destination, './css/style.css.map');

    console.log('output: ./css/style.css');

    fs.readFile(`${inputDir}/${inputFile}`, 'utf8', (err, data) => {
      if (err) throw err;
      less.render(data, {
        paths: [inputDir],    // Specify search paths for @import directives
        filename: inputFile,  // Specify a filename, for better error messages
        compress: false,      // Minify CSS output
        sourceMap: {
          sourceMapURL: 'style.css.map',
          outputSourceFiles: true
        }
      }, (e, output) => {
        fs.writeFile(outputCss, output.css, 'utf8', (err) => {
          if (err) throw err;
        });
        fs.writeFile(outputMap, output.map, 'utf8', (err) => {
          if (err) throw err;
        });
      });
    });
  }
}
