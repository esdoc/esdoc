'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _DocBuilder2 = require('./DocBuilder.js');

var _DocBuilder3 = _interopRequireDefault(_DocBuilder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Static file output builder class.
 */

var StaticFileBuilder = function (_DocBuilder) {
  _inherits(StaticFileBuilder, _DocBuilder);

  function StaticFileBuilder() {
    _classCallCheck(this, StaticFileBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StaticFileBuilder).apply(this, arguments));
  }

  _createClass(StaticFileBuilder, [{
    key: 'exec',

    /**
     * execute build output.
     * @param {function(content: string, filePath: string)} callback - is called with each output.
     */
    value: function exec(callback) {
      callback(_path2.default.resolve(__dirname, './template/css'), './css');
      callback(_path2.default.resolve(__dirname, './template/script'), './script');
      callback(_path2.default.resolve(__dirname, './template/image'), './image');

      // see DocBuilder#_buildLayoutDoc
      var scripts = this._config.scripts || [];
      for (var i = 0; i < scripts.length; i++) {
        var userScript = scripts[i];
        var name = './user/script/' + i + '-' + _path2.default.basename(userScript);
        callback(userScript, name);
      }

      var styles = this._config.styles || [];
      for (var _i = 0; _i < styles.length; _i++) {
        var userStyle = styles[_i];
        var _name = './user/css/' + _i + '-' + _path2.default.basename(userStyle);
        callback(userStyle, _name);
      }
    }
  }]);

  return StaticFileBuilder;
}(_DocBuilder3.default);

exports.default = StaticFileBuilder;