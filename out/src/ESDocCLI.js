#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _minimist = _interopRequireDefault(require("minimist"));

var _ESDoc = _interopRequireDefault(require("./ESDoc.js"));

var _NPMUtil = _interopRequireDefault(require("./Util/NPMUtil.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Command Line Interface for ESDoc.
 *
 * @example
 * let cli = new ESDocCLI(process.argv);
 * cli.exec();
 */
class ESDocCLI {
  /**
   * Create instance.
   * @param {Object} argv - this is node.js argv(``process.argv``)
   */
  constructor(argv) {
    /** @type {ESDocCLIArgv} */
    this._argv = (0, _minimist.default)(argv.slice(2));

    if (this._argv.h || this._argv.help) {
      this._showHelp();

      process.exit(0);
    }

    if (this._argv.v || this._argv.version) {
      this._showVersion();

      process.exit(0);
    }
  }
  /**
   * execute to generate document.
   */


  exec() {
    let config;

    const configPath = this._findConfigFilePath();

    if (configPath) {
      config = this._createConfigFromJSONFile(configPath);
    } else {
      config = this._createConfigFromPackageJSON();
    }

    if (config) {
      _ESDoc.default.generate(config);
    } else {
      this._showHelp();

      process.exit(1);
    }
  }
  /**
   * show help of ESDoc
   * @private
   */


  _showHelp() {
    console.log('Usage: esdoc [-c esdoc.json]');
    console.log('');
    console.log('Options:');
    console.log('  -c', 'specify config file');
    console.log('  -h', 'output usage information');
    console.log('  -v', 'output the version number');
    console.log('');
    console.log('ESDoc finds configuration by the order:');
    console.log('  1. `-c your-esdoc.json`');
    console.log('  2. `.esdoc.json` in current directory');
    console.log('  3. `.esdoc.js` in current directory');
    console.log('  4. `esdoc` property in package.json');
  }
  /**
   * show version of ESDoc
   * @private
   */


  _showVersion() {
    const packageObj = _NPMUtil.default.findPackage();

    if (packageObj) {
      console.log(packageObj.version);
    } else {
      console.log('0.0.0');
    }
  }
  /**
   * find ESDoc config file.
   * @returns {string|null} config file path.
   * @private
   */


  _findConfigFilePath() {
    if (this._argv.c) {
      return this._argv.c;
    }

    try {
      const filePath = _path.default.resolve('./.esdoc.json');

      _fs.default.readFileSync(filePath);

      return filePath;
    } catch (e) {// ignore
    }

    try {
      const filePath = _path.default.resolve('./.esdoc.js');

      _fs.default.readFileSync(filePath);

      return filePath;
    } catch (e) {// ignore
    }

    return null;
  }
  /**
   * create config object from config file.
   * @param {string} configFilePath - config file path.
   * @return {ESDocConfig} config object.
   * @private
   */


  _createConfigFromJSONFile(configFilePath) {
    configFilePath = _path.default.resolve(configFilePath);

    const ext = _path.default.extname(configFilePath);

    if (ext === '.js') {
      /* eslint-disable global-require */
      return require(configFilePath);
    } else {
      const configJSON = _fs.default.readFileSync(configFilePath, {
        encode: 'utf8'
      });

      const config = JSON.parse(configJSON);
      return config;
    }
  }
  /**
   * create config object from package.json.
   * @return {ESDocConfig|null} config object.
   * @private
   */


  _createConfigFromPackageJSON() {
    try {
      const filePath = _path.default.resolve('./package.json');

      const packageJSON = _fs.default.readFileSync(filePath, 'utf8').toString();

      const packageObj = JSON.parse(packageJSON);
      return packageObj.esdoc;
    } catch (e) {// ignore
    }

    return null;
  }

} // if this file is directory executed, work as CLI.


exports.default = ESDocCLI;

const executedFilePath = _fs.default.realpathSync(process.argv[1]);

if (executedFilePath === __filename) {
  const cli = new ESDocCLI(process.argv);
  cli.exec();
}