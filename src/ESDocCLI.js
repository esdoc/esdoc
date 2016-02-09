#!/usr/bin/env node
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import ESDoc from './ESDoc.js';
import defaultPublisher from './Publisher/publish.js';
import NPMUtil from './Util/NPMUtil.js';

/**
 * Command Line Interface for ESDoc.
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
      process.exit(0)
    }

    if (this._argv.v || this._argv.version) {
      this._showVersion();
      process.exit(0)
    }

    if (this._argv.rcdir) {
      this._rcFileDir = this._argv.rcdir;
    } else {
      this._rcFileDir = path.dirname(NPMUtil.findPackagePath());
    }
  }

  /**
   * execute to generate document.
   */
  exec() {
    let config;
    if (this._argv.c) {
      config = this._createConfigFromJSONFile(this._argv.c);
    } else {
      const localConfigFile = this._getLocalConfigFilePath();
      if (localConfigFile) {
        config = this._createConfigFromJSONFile(localConfigFile);
      } else {
        this._showHelp();
        process.exit(1);
      }
    }

    ESDoc.generate(config, defaultPublisher);
  }

  /**
   * get local config file path
   * @return {string} esdoc rcfile path.
   * @private
   */
  _getLocalConfigFilePath() {
    const configFiles = [
      'esdoc.json',
      '.esdocrc.js',
      '.esdocrc.json',
      '.esdocrc'
    ];
    for (const configFile of configFiles) {
      const configFilePath = path.join(this._rcFileDir, configFile);
      if (fs.existsSync(configFilePath)) {
        return configFilePath;
      }
    }
    return null;
  }

  /**
   * show help of ESDoc
   * @private
   */
  _showHelp() {
    console.log('usage: esdoc [-c esdoc.json] [--rcdir rcfile dir]');
  }

  /**
   * show version of ESDoc
   * @private
   */
  _showVersion() {
    let packageObj = NPMUtil.findPackage();
    if (packageObj) {
      console.log(packageObj.version);
    } else {
      console.log('0.0.0');
    }
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
      return require(configFilePath);
    } else {
      const configJSON = fs.readFileSync(configFilePath, {encode: 'utf8'});
      return JSON.parse(configJSON);
    }
  }
}

// if this file is directory executed, work as CLI.
let executedFilePath = fs.realpathSync(process.argv[1]);
if (executedFilePath === __filename) {
  let cli = new ESDocCLI(process.argv);
  cli.exec();
}
