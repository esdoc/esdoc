#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import esdoc2 from './ESDoc.js';
import NPMUtil from './Util/NPMUtil.js';

/**
 * Command Line Interface for esdoc2.
 *
 * @example
 * let cli = new ESDocCLI(process.argv);
 * cli.exec();
 */
export default class ESDocCLI {
  /**
   * Create instance.
   * @param {Object} argv - this is node.js argv(``process.argv``)
   */
  constructor(argv) {
    /** @type {ESDocCLIArgv} */
    this._argv = minimist(argv.slice(2));

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
    console.log({configPath});
    if (configPath) {
      config = this._createConfigFromJSONFile(configPath);
    } else {
      config = this._createConfigFromPackageJSON();
    }

    if (config) {
      esdoc2.generate(config);
    } else {
      console.log();
      this._showHelp();
      process.exit(1);
    }
  }

  /**
   * show help of esdoc2
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
    console.log('esdoc2 finds configuration by the order:');
    console.log('  1. `-c your-esdoc.json`');
    console.log('  2. `.esdoc.json` in current directory');
    console.log('  3. `.esdoc.js` in current directory');
    console.log('  4. `esdoc` property in package.json');
  }

  /**
   * show version of esdoc2
   * @private
   */
  _showVersion() {
    const packageObj = NPMUtil.findPackage();
    if (packageObj) {
      console.log(packageObj.version);
    } else {
      console.log('0.0.0');
    }
  }

  /**
   * find esdoc2 config file.
   * @returns {string|null} config file path.
   * @private
   */
  _findConfigFilePath() {
    if (this._argv.c) {
      return this._argv.c;
    }

    try {
      const filePath = path.resolve('./.esdoc.json');
      fs.readFileSync(filePath);
      return filePath;
    } catch (e) {
      // ignore
    }

    try {
      const filePath = path.resolve('./.esdoc.js');
      fs.readFileSync(filePath);
      return filePath;
    } catch (e) {
      // ignore
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
    configFilePath = path.resolve(configFilePath);
    const ext = path.extname(configFilePath);
    if (ext === '.js') {
      /* eslint-disable global-require */
      return require(configFilePath);
    } else {
      const configJSON = fs.readFileSync(configFilePath, {encode: 'utf8'});
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
      const filePath = path.resolve('./package.json');
      const packageJSON = fs.readFileSync(filePath, 'utf8').toString();
      const packageObj = JSON.parse(packageJSON);
      return packageObj.esdoc2;
    } catch (e) {
      // ignore
    }

    return null;
  }
}

// if this file is directory executed, work as CLI.
const executedFilePath = fs.realpathSync(process.argv[1]);
if (executedFilePath === __filename) {
  const cli = new ESDocCLI(process.argv);
  cli.exec();
}
