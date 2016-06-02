#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _ESDoc = require('./ESDoc.js');

var _ESDoc2 = _interopRequireDefault(_ESDoc);

var _publish = require('./Publisher/publish.js');

var _publish2 = _interopRequireDefault(_publish);

var _NPMUtil = require('./Util/NPMUtil.js');

var _NPMUtil2 = _interopRequireDefault(_NPMUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Command Line Interface for ESDoc.
 *
 * @example
 * let cli = new ESDocCLI(process.argv);
 * cli.exec();
 */

var ESDocCLI = function () {
  /**
   * Create instance.
   * @param {Object} argv - this is node.js argv(``process.argv``)
   */

  function ESDocCLI(argv) {
    _classCallCheck(this, ESDocCLI);

    /** @type {ESDocCLIArgv} */
    this._argv = (0, _minimist2.default)(argv.slice(2));

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


  _createClass(ESDocCLI, [{
    key: 'exec',
    value: function exec() {
      var config = void 0;
      if (this._argv.c) {
        config = this._createConfigFromJSONFile(this._argv.c);
      } else {
        this._showHelp();
        process.exit(1);
      }

      _ESDoc2.default.generate(config, _publish2.default);
    }

    /**
     * show help of ESDoc
     * @private
     */

  }, {
    key: '_showHelp',
    value: function _showHelp() {
      console.log('usage: esdoc [-c esdoc.json]');
    }

    /**
     * show version of ESDoc
     * @private
     */

  }, {
    key: '_showVersion',
    value: function _showVersion() {
      var packageObj = _NPMUtil2.default.findPackage();
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

  }, {
    key: '_createConfigFromJSONFile',
    value: function _createConfigFromJSONFile(configFilePath) {
      configFilePath = _path2.default.resolve(configFilePath);
      var ext = _path2.default.extname(configFilePath);
      if (ext === '.js') {
        return require(configFilePath);
      } else {
        var configJSON = _fs2.default.readFileSync(configFilePath, { encode: 'utf8' });
        var config = JSON.parse(configJSON);
        return config;
      }
    }
  }]);

  return ESDocCLI;
}();

// if this file is directory executed, work as CLI.


exports.default = ESDocCLI;
var executedFilePath = _fs2.default.realpathSync(process.argv[1]);
if (executedFilePath === __filename) {
  var cli = new ESDocCLI(process.argv);
  cli.exec();
}