import fs from 'fs';
import AbstractDoc from './AbstractDoc.js';

/**
 * Doc Class from source file.
 */
export default class FileDoc extends AbstractDoc {
  /**
   * apply own tag.
   * @private
   */
  _apply() {
    super._apply();

    delete this._value.export;
    delete this._value.importPath;
    delete this._value.importStyle;
  }

  /** specify ``file`` to kind. */
  _$kind() {
    super._$kind();
    this._value.kind = 'file';
  }

  /** take out self name from file path */
  _$name() {
    super._$name();
    this._value.name = this._pathResolver.filePath;
  }

  /** specify name to longname */
  _$longname() {
    this._value.longname = this._value.name;
  }

  /** specify file content to value.content */
  _$content() {
    super._$content();

    let filePath = this._pathResolver.fileFullPath;
    let content = fs.readFileSync(filePath, {encode: 'utf8'}).toString();
    this._value.content = content;
  }
}
