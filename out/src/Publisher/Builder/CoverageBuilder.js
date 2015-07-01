'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _DocBuilderJs = require('./DocBuilder.js');

var _DocBuilderJs2 = _interopRequireDefault(_DocBuilderJs);

/**
 * Coverage output builder class.
 */

var CoverageBuilder = (function (_DocBuilder) {
  function CoverageBuilder() {
    _classCallCheck(this, CoverageBuilder);

    _get(Object.getPrototypeOf(CoverageBuilder.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(CoverageBuilder, _DocBuilder);

  _createClass(CoverageBuilder, [{
    key: 'exec',

    /**
     * execute building output.
     * @param {function(coverage: CoverageObject, filePath: string)} callback - is called with coverage.
     */
    value: function exec(callback) {
      var docs = this._find({ kind: ['class', 'method', 'member', 'get', 'set', 'constructor', 'function', 'variable'] });
      var expectCount = docs.length;
      var actualCount = 0;
      var files = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var doc = _step.value;

          var filePath = doc.longname.split('~')[0];
          if (!files[filePath]) files[filePath] = { expectCount: 0, actualCount: 0 };
          files[filePath].expectCount++;

          if (!doc.undocument) {
            actualCount++;
            files[filePath].actualCount++;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var coverage = {
        coverage: Math.floor(10000 * actualCount / expectCount) / 100 + '%',
        expectCount: expectCount,
        actualCount: actualCount,
        files: files
      };

      callback(coverage, 'coverage.json');
    }
  }]);

  return CoverageBuilder;
})(_DocBuilderJs2['default']);

exports['default'] = CoverageBuilder;
module.exports = exports['default'];