'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _srcESDocCLIJs = require('../../../src/ESDocCLI.js');

var _srcESDocCLIJs2 = _interopRequireDefault(_srcESDocCLIJs);

/** @test {ESDocCLI} */
describe('ESDocCLI:', function () {

  /**
   * @test {ESDocCLI#exec}
   * @test {ESDocCLI#_createConfigFromJSONFile}
   */
  it('can execute with config file.', function () {
    var cliPath = _path2['default'].resolve('./src/cli.js');
    var configPath = _path2['default'].resolve('./test/fixture/esdoc.json');
    var argv = ['node', cliPath, '-c', configPath];
    var cli = new _srcESDocCLIJs2['default'](argv);
    cli.exec();
    (0, _assert2['default'])(true);
  });
});