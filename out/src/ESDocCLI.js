#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _ESDocJs = require('./ESDoc.js');

var _ESDocJs2 = _interopRequireDefault(_ESDocJs);

var _PublisherPublishJs = require('./Publisher/publish.js');

var _PublisherPublishJs2 = _interopRequireDefault(_PublisherPublishJs);

/**
 * Command Line Interface for ESDoc.
 *
 * @example
 * let cli = new ESDocCLI(process.argv);
 * cli.exec();
 */

var ESDocCLI = (function () {
  /**
   * Create instance.
   * @param {Object} argv - this is node.js argv(``process.argv``)
   */

  function ESDocCLI(argv) {
    _classCallCheck(this, ESDocCLI);

    /** @type {ESDocCLIArgv} */
    this._argv = (0, _minimist2['default'])(argv.slice(2));

    /** @type {NPMPackageObject} */
    this._packageObj = this._findPackageJSON();

    if (this._argv.h || this._argv.help) {
      this._showHelp();
      process.exit(0);
    }

    if (this._argv.v || this._argv.version) {
      this._showVersion();
      process.exit(0);
    }
  }

  _createClass(ESDocCLI, [{
    key: 'exec',

    /**
     * execute to generate document.
     */
    value: function exec() {
      var config = undefined;
      if (this._argv.c) {
        config = this._createConfigFromJSONFile(this._argv.c);
      } else {
        this._showHelp();
        process.exit(1);
      }

      config._esdocVersion = this._packageObj.version;
      _ESDocJs2['default'].generate(config, _PublisherPublishJs2['default']);
    }
  }, {
    key: '_findPackageJSON',

    /**
     * find npm package.json
     * @returns {NPMPackageObject|null} parsed package.json
     * @private
     */
    value: function _findPackageJSON() {
      var packageObj = null;
      try {
        var packageFilePath = _path2['default'].resolve(__dirname, '../package.json');
        var json = _fs2['default'].readFileSync(packageFilePath, { encode: 'utf8' });
        packageObj = JSON.parse(json);
      } catch (e) {
        var packageFilePath = _path2['default'].resolve(__dirname, '../../package.json');
        var json = _fs2['default'].readFileSync(packageFilePath, { encode: 'utf8' });
        packageObj = JSON.parse(json);
      }

      return packageObj;
    }
  }, {
    key: '_showHelp',

    /**
     * show help of ESDoc
     * @private
     */
    value: function _showHelp() {
      console.log('usage: esdoc [-c esdoc.json]');
    }
  }, {
    key: '_showVersion',

    /**
     * show version of ESDoc
     * @private
     */
    value: function _showVersion() {
      console.log(this._packageObj.version);
    }
  }, {
    key: '_createConfigFromJSONFile',

    /**
     * create config object from config file.
     * @param {string} configFilePath - config file path.
     * @return {ESDocConfig} config object.
     * @private
     */
    value: function _createConfigFromJSONFile(configFilePath) {
      configFilePath = _path2['default'].resolve(configFilePath);
      var configJSON = _fs2['default'].readFileSync(configFilePath, { encode: 'utf8' });
      var config = JSON.parse(configJSON);

      return config;
    }
  }]);

  return ESDocCLI;
})();

exports['default'] = ESDocCLI;

// if this file is directory executed, work as CLI.
var executedFilePath = _fs2['default'].realpathSync(process.argv[1]);
if (executedFilePath === __filename) {
  var cli = new ESDocCLI(process.argv);
  cli.exec();
}
module.exports = exports['default'];