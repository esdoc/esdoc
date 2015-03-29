import fs from 'fs';
import AbstractDoc from './AbstractDoc.js';

export default class FileDoc extends AbstractDoc {
  constructor(...args) {
    super(...args);

    let filePath = this._pathResolver.fileFullPath;
    let content = fs.readFileSync(filePath, {encode: 'utf8'}).toString();
    this._push('@content', content);
  }

  get kind() {
    return 'file';
  }

  get name() {
    return this._pathResolver.filePath;
  }

  get memberof() {
    return null;
  }

  get longname() {
    return this.name;
  }
}
