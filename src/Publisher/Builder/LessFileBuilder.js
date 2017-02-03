import fs from 'fs';
import path from 'path';
import less from 'less';
import DocBuilder from './DocBuilder.js';

/**
 * LESS to CSS file output builder class.
 */
export default class LessFileBuilder extends DocBuilder {
  /**
   * execute building output.
   */
  exec() {
    console.log('output: ./css/style.css');
    console.log('output: ./css/style.css.map');

    // set theme filename
    const theme = (this._config.less || {}).theme;
    this.theme = theme ? `theme-${theme}.less` : null;

    // set path to /less, /css, and relative from /css to /less
    const input = path.resolve(__dirname, './template/less');
    const output = path.resolve(this._config.destination, './css');
    const relative = path.relative(output, input);
    this.path = {input, output, relative};

    if (this.theme) {
      fs.readFile(`${this.path.input}/${this.theme}`, 'utf8', (err, data) => {
        if (err) throw err;
        this._lessRender(data);
      });
    } else {
      this._lessRender();
    }
  }

  /**
   * render less to css.
   * @param {string} data - less content of the theme file.
   * @private
   */
  _lessRender(data = '') {
    const imports = this._buildImports();
    const paths = [this.path.input];
    const filename = this.theme || 'style.less';

    less.render(`${imports}\n${data}`, {
      paths: paths,       // Specify search paths for @import directives
      filename: filename, // Specify a filename, for better error messages
      compress: false,    // Minify CSS output
      sourceMap: {
        sourceMapURL: 'style.css.map',
        outputSourceFiles: true
      }
    }, (err, output) => {
      if (err) throw err;
      this._outputCss(output.css);
      this._outputMap(output.map);
    });
  }

  /**
   * write style.css to the destination.
   * @param {string} css - css content.
   * @private
   */
  _outputCss(css) {
    fs.writeFile(`${this.path.output}/style.css`, css, 'utf8', (err) => {
      if (err) throw err;
    });
  }

  /**
   * write style.css.map to the destination.
   * @param {string} map - sourcemap.
   * @private
   */
  _outputMap(map) {
    const absolute = new RegExp(this.path.input, 'g');
    map = map.replace(absolute, this.path.relative);

    fs.writeFile(`${this.path.output}/style.css.map`, map, 'utf8', (err) => {
      if (err) throw err;
    });
  }

  /**
   * build list of LESS import.
   * @private
   */
  _buildImports() {
    const available = [
      'variables',
      'text',
      'layout',
      'menu',
      'search',
      'aside',
      'helper',
      'doc',
      'summary',
      'manual',
      'markdown'
    ];
    const list = (this._config.less || {}).imports;
    const less = [];
    available.forEach(item => {
      if (!list || list.indexOf(item) !== -1) {
        less.push(`@import "core/${item}";`);
      }
    });
    return less.join('\n');
  }

}
