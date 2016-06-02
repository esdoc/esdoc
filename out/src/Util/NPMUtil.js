'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Node Package Manager(npm) util class.
 */

var NPMUtil = function () {
  function NPMUtil() {
    _classCallCheck(this, NPMUtil);
  }

  _createClass(NPMUtil, null, [{
    key: 'findPackage',


    /**
     * find ESDoc package.json object.
     * @returns {Object} package.json object.
     */
    value: function findPackage() {
      var packageObj = null;
      try {
        var packageFilePath = _path2.default.resolve(__dirname, '../../package.json');
        var json = _fsExtra2.default.readFileSync(packageFilePath, { encode: 'utf8' });
        packageObj = JSON.parse(json);
      } catch (e) {
        var _packageFilePath = _path2.default.resolve(__dirname, '../../../package.json');
        var _json = _fsExtra2.default.readFileSync(_packageFilePath, { encode: 'utf8' });
        packageObj = JSON.parse(_json);
      }

      return packageObj;
    }
  }]);

  return NPMUtil;
}();

exports.default = NPMUtil;