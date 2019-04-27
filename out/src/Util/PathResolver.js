"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _assert = _interopRequireDefault(require("assert"));

var _os = _interopRequireDefault(require("os"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * file path resolver.
 * @example
 * let pathResolver = new PathResolver('./src', 'foo/bar.js', 'foo-bar', 'foo/bar.js');
 * pathResolver.importPath; // 'foo-bar'
 * pathResolver.filePath; // 'src/foo/bar.js'
 * pathResolver.resolve('./baz.js'); // 'src/foo/baz.js'
 */
class PathResolver {
  /**
   * create instance.
   * @param {string} inDirPath - root directory path.
   * @param {string} filePath - relative file path from root directory path.
   * @param {string} [packageName] - npm package name.
   * @param {string} [mainFilePath] - npm main file path.
   */
  constructor(inDirPath, filePath, packageName = null, mainFilePath = null) {
    (0, _assert.default)(inDirPath);
    (0, _assert.default)(filePath);
    /** @type {string} */

    this._inDirPath = _path.default.resolve(inDirPath);
    /** @type {string} */

    this._filePath = _path.default.resolve(filePath);
    /** @type {NPMPackageObject} */

    this._packageName = packageName;

    if (mainFilePath) {
      /** @type {string} */
      this._mainFilePath = _path.default.resolve(mainFilePath);
    }
  }
  /**
   * import path that is considered package name, main file and path prefix.
   * @type {string}
   */


  get importPath() {
    const relativeFilePath = this.filePath;

    if (this._mainFilePath === _path.default.resolve(relativeFilePath)) {
      return this._packageName;
    }

    let filePath;

    if (this._packageName) {
      filePath = _path.default.normalize(`${this._packageName}${_path.default.sep}${relativeFilePath}`);
    } else {
      filePath = `./${relativeFilePath}`;
    }

    return this._slash(filePath);
  }
  /**
   * file full path.
   * @type {string}
   */


  get fileFullPath() {
    return this._slash(this._filePath);
  }
  /**
   * file path that is relative path on root dir.
   * @type {string}
   */


  get filePath() {
    const relativeFilePath = _path.default.relative(_path.default.dirname(this._inDirPath), this._filePath);

    return this._slash(relativeFilePath);
  }
  /**
   * resolve file path on this file.
   * @param {string} relativePath - relative path on this file.
   */


  resolve(relativePath) {
    const selfDirPath = _path.default.dirname(this._filePath);

    const resolvedPath = _path.default.resolve(selfDirPath, relativePath);

    const resolvedRelativePath = _path.default.relative(_path.default.dirname(this._inDirPath), resolvedPath);

    return this._slash(resolvedRelativePath);
  }
  /**
   * convert 'back slash' to 'slash'.
   * path separator is 'back slash' if platform is windows.
   * @param {string} filePath - target file path.
   * @returns {string} converted path.
   * @private
   */


  _slash(filePath) {
    if (_os.default.platform() === 'win32') {
      filePath = filePath.replace(/\\/g, '/');
    }

    return filePath;
  }

}

exports.default = PathResolver;