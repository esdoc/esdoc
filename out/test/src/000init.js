'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _taffydb = require('taffydb');

var _srcESDocJs = require('../../src/ESDoc.js');

var _srcESDocJs2 = _interopRequireDefault(_srcESDocJs);

var _srcPublisherPublishJs = require('../../src/Publisher/publish.js');

var _srcPublisherPublishJs2 = _interopRequireDefault(_srcPublisherPublishJs);

var configFilePath = './test/fixture/esdoc.json';
var configJSON = _fsExtra2['default'].readFileSync(configFilePath, { encode: 'utf8' });
var config = JSON.parse(configJSON);

_srcESDocJs2['default'].generate(config, function (data, asts, config) {
  _fsExtra2['default'].removeSync(config.destination);

  var db = (0, _taffydb.taffy)(data);
  db.find = function () {
    return db.apply(undefined, arguments).map(function (v) {
      return v;
    });
  };

  global.db = db;

  (0, _srcPublisherPublishJs2['default'])(data, asts, config);
});