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
  }

  /**
   * execute to generate document.
   */
  exec() {
    const config = this._argv.c
      ? this._createConfigFromJSONFile(this._argv.c)
      : this._createConfigFromPackageJSON();

    if (!config) {
      this._showHelp();
      process.exit(1);
    }

    ESDoc.generate(config, defaultPublisher);
  }

  /**
   * show help of ESDoc
   * @private
   */
  _showHelp() {
    console.log('Could not find configuration file!');
    console.log('Provide a configuration file: esdoc [-c esdoc.json]');
    console.log('or add the configuration to your package.json with "esdoc" as key.');
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
      const config = JSON.parse(configJSON);
      return config;
    }
  }

  /**
   * Creates a configuration object by parsing the root package.json.
   * @return {ESDocConfig} config object, or undefined if it was not found.
   * @private
   */
  _createConfigFromPackageJSON() {
    const pkgPath = path.resolve('./package.json');

    try {
      const configJSON = fs.readFileSync(pkgPath, {encode: 'utf8'});
      const config = JSON.parse(configJSON);
      return config.esdoc;
    } catch (err) {
      return undefined;
    }
  }
}

// if this file is directory executed, work as CLI.
let executedFilePath = fs.realpathSync(process.argv[1]);
if (executedFilePath === __filename) {
  let cli = new ESDocCLI(process.argv);
  cli.exec();
}
