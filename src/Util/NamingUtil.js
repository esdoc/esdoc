import path from 'path';

let filePathMap = {};

export default class NamingUtil {
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
