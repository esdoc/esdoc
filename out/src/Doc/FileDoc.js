'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _AbstractDocJs = require('./AbstractDoc.js');

var _AbstractDocJs2 = _interopRequireDefault(_AbstractDocJs);

/**
 * Doc Class from source file.
 */

var FileDoc = (function (_AbstractDoc) {
  function FileDoc() {
    _classCallCheck(this, FileDoc);

    _get(Object.getPrototypeOf(FileDoc.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(FileDoc, _AbstractDoc);

  _createClass(FileDoc, [{
    key: '_apply',

    /**
     * apply own tag.
     * @private
     */
    value: function _apply() {
      _get(Object.getPrototypeOf(FileDoc.prototype), '_apply', this).call(this);

      delete this._value['export'];
      delete this._value.importPath;
      delete this._value.importStyle;
    }
  }, {
    key: '@kind',

    /** specify ``file`` to kind. */
    value: function kind() {
      _get(Object.getPrototypeOf(FileDoc.prototype), '@kind', this).call(this);
      if (this._value.kind) return;
      this._value.kind = 'file';
    }
  }, {
    key: '@name',

    /** take out self name from file path */
    value: function name() {
      _get(Object.getPrototypeOf(FileDoc.prototype), '@name', this).call(this);
      if (this._value.name) return;
      this._value.name = this._pathResolver.filePath;
    }
  }, {
    key: '@longname',

    /** specify name to longname */
    value: function longname() {
      var value = this._findTagValue(['@longname']);
      if (value) {
        this._value.longname = value;
      } else {
        this._value.longname = this._value.name;
      }
    }
  }, {
    key: '@content',

    /** specify file content to value.content */
    value: function content() {
      _get(Object.getPrototypeOf(FileDoc.prototype), '@content', this).call(this);
      if ('content' in this._value) return;

      var filePath = this._pathResolver.fileFullPath;
      var content = _fs2['default'].readFileSync(filePath, { encode: 'utf8' }).toString();
      this._value.content = content;
    }
  }]);

  return FileDoc;
})(_AbstractDocJs2['default']);

exports['default'] = FileDoc;
module.exports = exports['default'];