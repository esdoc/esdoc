import path from 'path';
import assert from 'assert';

export default class PathResolver {
  constructor(inDirPath, filePath, packageName = null, mainFilePath = null, pathPrefix = '') {
    assert(inDirPath);
    assert(filePath);

    this._inDirPath = path.resolve(inDirPath);
    this._filePath = path.resolve(filePath);
    this._packageName = packageName;
    if (mainFilePath) {
      this._mainFilePath = path.resolve(mainFilePath);
    }
    this._pathPrefix = pathPrefix || '';

    this._prefixedFilePath = path.resolve(`${this._pathPrefix}${path.sep}${this.filePath}`);
  }

  get importPath() {
    if (this._mainFilePath === this._prefixedFilePath) {
      return this._packageName;
    }

    let relativeFilePath = this.filePath;
    if (this._packageName) {
      return path.normalize(`${this._packageName}${path.sep}${this._pathPrefix}${path.sep}${relativeFilePath}`);
    } else {
      return `./${relativeFilePath}`;
    }
  }

  get fileFullPath() {
    return this._filePath;
  }

  get filePath() {
    let relativeFilePath = path.relative(path.dirname(this._inDirPath), this._filePath);
    return relativeFilePath;
  }

  resolve(relativePath) {
    let selfDirPath = path.dirname(this._filePath);
    let resolvedPath = path.resolve(selfDirPath, relativePath);
    let resolvedRelativePath = path.relative(path.dirname(this._inDirPath), resolvedPath);
    return resolvedRelativePath;
  }
}
