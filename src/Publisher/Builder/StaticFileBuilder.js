import path from 'path';
import DocBuilder from './DocBuilder.js';

/**
 * Static file output builder class.
 */
export default class StaticFileBuilder extends DocBuilder {
  /**
   * execute build output.
   * @param {function(content: string, filePath: string)} callback - is called with each output.
   */
  exec(callback) {
    callback(path.resolve(__dirname, './template/css'), './css');
    callback(path.resolve(__dirname, './template/script'), './script');
    callback(path.resolve(__dirname, './template/image'), './image');

    // see DocBuilder#_buildLayoutDoc
    const scripts = this._config.scripts || [];
    for (let i = 0; i < scripts.length; i++) {
      const userScript = scripts[i];
      const name = `./user/script/${i}-${path.basename(userScript)}`;
      callback(userScript, name);
    }

    const styles = this._config.styles || [];
    for (let i = 0; i < styles.length; i++) {
      const userStyle = styles[i];
      const name = `./user/css/${i}-${path.basename(userStyle)}`;
      callback(userStyle, name);
    }

    if (this._config.logo) {
      const logo = this._config.logo.match(/[^\/]+$/)[0];
      callback(path.resolve(this._config.logo), `.image/${logo}`);
    }
  }
}
