import path from 'path';
import fs from 'fs-extra';

export default class NPMUtil {
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
}
