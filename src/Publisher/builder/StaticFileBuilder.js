import path from 'path';
import DocBuilder from './DocBuilder.js';

export default class StaticFileBuilder extends DocBuilder {
  exec(callback) {
    callback(path.resolve(__dirname, './template/css'), './css');
    callback(path.resolve(__dirname, './template/script'), './script');
    callback(path.resolve(__dirname, './template/image'), './image');

    // see DocBuilder#_buildLayoutDoc
    let scripts = this._config.scripts || [];
    for (let i = 0; i < scripts.length; i++) {
      let userScript = scripts[i];
      let name = `./user/script/${i}-${path.basename(userScript)}`;
      callback(userScript, name);
    }

    let styles = this._config.styles || [];
    for (let i = 0; i < styles.length; i++) {
      let userStyle = styles[i];
      let name = `./user/css/${i}-${path.basename(userStyle)}`;
      callback(userStyle, name);
    }
  }
}
