#!/usr/bin/env node
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import ESDoc from './ESDoc.js';
import defaultPublisher from './Publisher/publish.js';

export default class ESDocCLI {
  constructor(argv) {
    this._argv = minimist(argv.slice(2));
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

  _showHelp() {
    console.log('usage: esdoc [-c esdoc.json | path/to/dir]');
  }

  _showVersion() {
    console.log(this._packageObj.version);
  }

  _createConfigFromJSONFile(configFilePath) {
    configFilePath = path.resolve(configFilePath);
    let configJSON = fs.readFileSync(configFilePath, {encode: 'utf8'});
    let config = JSON.parse(configJSON);

    return config;
  }

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
      pattern: '\\.js$|\\.es6$',
      destination: '_esdoc_',
      title: 'NO TITLE',
      description: 'NO DESCRIPTION',
      readme: readmeStat ? './README.md' : ''
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
