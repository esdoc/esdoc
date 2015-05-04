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
    } else if (this._argv._.length) {
      config = this._createConfigFromPath(this._argv._[0]);
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
    console.log('usage: esdoc [-c esdoc.json | path/to/dir]');
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

  /**
   * create config object from target root directory.
   * @param {string} targetPath - target root directory path.
   * @return {{source: string, destination: string}} minimum config object.
   * @private
   */
  _createConfigFromPath(targetPath) {
    targetPath = path.resolve(targetPath);
    let stat = fs.statSync(targetPath);
    let config;

    if (!stat.isDirectory()) {
      this._showHelp();
      process.exit(1);
    }

    let readmeStat = null;
    try {
      readmeStat = fs.statSync('./README.md');
    } catch(e) {
      // ignore
    }

    config = {
      source: targetPath,
      destination: '_esdoc_'
    };

    return config;
  }
}

// if this file is directory executed, work as CLI.
let executedFilePath = fs.realpathSync(process.argv[1]);
if (executedFilePath === __filename) {
  let cli = new ESDocCLI(process.argv);
  cli.exec();
}
