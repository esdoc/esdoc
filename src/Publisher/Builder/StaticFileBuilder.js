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
  }
}
