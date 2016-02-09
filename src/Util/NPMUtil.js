import path from 'path';
import fs from 'fs-extra';

/**
 * Node Package Manager(npm) util class.
 */
export default class NPMUtil {

  /**
   * find ESDoc package.json object.
   * @returns {Object} package.json object.
   */
  static findPackage() {
    let packageObj = null;
    try {
      let packageFilePath = path.resolve(__dirname, '../../package.json');
      let json = fs.readFileSync(packageFilePath, {encode: 'utf8'});
      packageObj = JSON.parse(json);
    } catch (e) {
      let packageFilePath = path.resolve(__dirname, '../../../package.json');
      let json = fs.readFileSync(packageFilePath, {encode: 'utf8'});
      packageObj = JSON.parse(json);
    }

    return packageObj;
  }

  /**
   * Find the closest package.json file, working up from process.cwd to root.
   * @returns {string} package.json path.
   */
  static findPackagePath(startDir) {
    let dir = path.resolve(startDir || process.cwd());
    do {
      const packagePath = path.join(dir, 'package.json');
      if (!fs.existsSync(packagePath)) {
        dir = path.join(dir, '..');
        continue;
      }
      return packagePath;
    } while (dir !== path.resolve(dir, '..'));
    return null;
  }
}
