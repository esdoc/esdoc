'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * file path resolver.
 * @example
 * let pathResolver = new PathResolver('./src', 'foo/bar.js', 'foo-bar', 'foo/bar.js');
 * pathResolver.importPath; // 'foo-bar'
 * pathResolver.filePath; // 'src/foo/bar.js'
 * pathResolver.resolve('./baz.js'); // 'src/foo/baz.js'
 */

var PathResolver = function () {
  /**
   * create instance.
   * @param {string} inDirPath - root directory path.
   * @param {string} filePath - relative file path from root directory path.
   * @param {string} [packageName] - npm package name.
   * @param {string} [mainFilePath] - npm main file path.
   */

  function PathResolver(inDirPath, filePath) {
    var packageName = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var mainFilePath = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, PathResolver);

    (0, _assert2.default)(inDirPath);
    (0, _assert2.default)(filePath);

    /** @type {string} */
    this._inDirPath = _path2.default.resolve(inDirPath);

    /** @type {string} */
    this._filePath = _path2.default.resolve(filePath);

    /** @type {NPMPackageObject} */
    this._packageName = packageName;

    if (mainFilePath) {
      /** @type {string} */
      this._mainFilePath = _path2.default.resolve(mainFilePath);
    }
  }

  /**
   * import path that is considered package name, main file and path prefix.
   * @type {string}
   */


  _createClass(PathResolver, [{
    key: 'resolve',


    /**
     * resolve file path on this file.
     * @param {string} relativePath - relative path on this file.
     */
    value: function resolve(relativePath) {
      var selfDirPath = _path2.default.dirname(this._filePath);
      var resolvedPath = _path2.default.resolve(selfDirPath, relativePath);
      var resolvedRelativePath = _path2.default.relative(_path2.default.dirname(this._inDirPath), resolvedPath);
      return this._slash(resolvedRelativePath);
    }

    /**
     * convert 'back slash' to 'slash'.
     * path separator is 'back slash' if platform is windows.
     * @param {string} filePath - target file path.
     * @returns {string} converted path.
     * @private
     */

  }, {
    key: '_slash',
    value: function _slash(filePath) {
      if (_os2.default.platform() === 'win32') {
        filePath = filePath.replace(/\\/g, '/');
      }

      return filePath;
    }
  }, {
    key: 'importPath',
    get: function get() {
      var relativeFilePath = this.filePath;

      if (this._mainFilePath === _path2.default.resolve(relativeFilePath)) {
        return this._packageName;
      }

      var filePath = void 0;
      if (this._packageName) {
        filePath = _path2.default.normalize('' + this._packageName + _path2.default.sep + relativeFilePath);
      } else {
        filePath = './' + relativeFilePath;
      }

      return this._slash(filePath);
    }

    /**
     * file full path.
     * @type {string}
     */

  }, {
    key: 'fileFullPath',
    get: function get() {
      return this._slash(this._filePath);
    }

    /**
     * file path that is relative path on root dir.
     * @type {string}
     */

  }, {
    key: 'filePath',
    get: function get() {
      var relativeFilePath = _path2.default.relative(_path2.default.dirname(this._inDirPath), this._filePath);
      return this._slash(relativeFilePath);
    }
  }]);

  return PathResolver;
}();

exports.default = PathResolver;