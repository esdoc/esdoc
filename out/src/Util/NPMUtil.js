"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Node Package Manager(npm) util class.
 */
class NPMUtil {
  /**
   * find ESDoc package.json object.
   * @returns {Object} package.json object.
   */
  static findPackage() {
    let packageObj = null;

    try {
      const packageFilePath = _path.default.resolve(__dirname, '../../package.json');

      const json = _fsExtra.default.readFileSync(packageFilePath, {
        encode: 'utf8'
      });

      packageObj = JSON.parse(json);
    } catch (e) {
      const packageFilePath = _path.default.resolve(__dirname, '../../../package.json');

      const json = _fsExtra.default.readFileSync(packageFilePath, {
        encode: 'utf8'
      });

      packageObj = JSON.parse(json);
    }

    return packageObj;
  }

}

exports.default = NPMUtil;