"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const filePathMap = {};
/**
 * Identifier Naming Util class.
 */

class NamingUtil {
  /**
   * naming with file path.
   * @param {string} filePath - target file path.
   * @returns {string} name
   */
  static filePathToName(filePath) {
    let basename = _path.default.basename(filePath).split('.')[0];

    basename = basename.replace(/[^a-zA-Z0-9_$]/g, '');
    filePathMap[filePath] = filePathMap[filePath] || 0;
    const count = filePathMap[filePath];
    if (count > 0) basename += count;
    filePathMap[filePath]++;
    return basename;
  }

}

exports.default = NamingUtil;