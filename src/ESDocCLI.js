#!/usr/bin/env node
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import ESDoc from './ESDoc.js';
import defaultPublisher from './Publisher/publish.js';

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

    /** @type {NPMPackageObject} */
    this._packageObj = this._findPackageJSON();

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
    let config;
    if (this._argv.c) {
      config = this._createConfigFromJSONFile(this._argv.c);
    } else {
      this._showHelp();
      process.exit(1);
    }

    config._esdocVersion = this._packageObj.version;
    ESDoc.generate(config, defaultPublisher);
  }

  /**
   * find npm package.json
   * @returns {NPMPackageObject|null} parsed package.json
   * @private
   */
  _findPackageJSON() {
    let packageObj = null;
    try {
      let packageFilePath = path.resolve(__dirname, '../package.json');
      let json = fs.readFileSync(packageFilePath, {encode: 'utf8'});
      packageObj = JSON.parse(json);
    } catch (e) {
      let packageFilePath = path.resolve(__dirname, '../../package.json');
      let json = fs.readFileSync(packageFilePath, {encode: 'utf8'});
      packageObj = JSON.parse(json);
    }

    return packageObj;
  }

  /**
   * show help of ESDoc
   * @private
   */
  _showHelp() {
    console.log('usage: esdoc [-c esdoc.json]');
  }

  /**
   * show version of ESDoc
   * @private
   */
  _showVersion() {
    console.log(this._packageObj.version);
  }

  /**
   * create config object from config file.
   * @param {string} configFilePath - config file path.
   * @return {ESDocConfig} config object.
   * @private
   */
  _createConfigFromJSONFile(configFilePath) {
    configFilePath = path.resolve(configFilePath);
    let configJSON = fs.readFileSync(configFilePath, {encode: 'utf8'});
    let config = JSON.parse(configJSON);

    return config;
  }
}

// if this file is directory executed, work as CLI.
let executedFilePath = fs.realpathSync(process.argv[1]);
if (executedFilePath === __filename) {
  let cli = new ESDocCLI(process.argv);
  cli.exec();
}
