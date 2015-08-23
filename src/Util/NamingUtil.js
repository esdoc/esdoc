import path from 'path';

let filePathMap = {};

/**
 * Identifier Naming Util class.
 */
export default class NamingUtil {
  /**
   * naming with file path.
   * @param {string} filePath - target file path.
   * @returns {string} name
   */
  static filePathToName(filePath) {
    let basename = path.basename(filePath).split('.')[0];
    basename = basename.replace(/[^a-zA-Z0-9_$]/g, '');

    filePathMap[filePath] = filePathMap[filePath] || 0;
    let count = filePathMap[filePath];
    if (count > 0) basename += count;
    filePathMap[filePath]++;

    return basename;
  }
}
