'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _DocBuilderJs = require('./DocBuilder.js');

var _DocBuilderJs2 = _interopRequireDefault(_DocBuilderJs);

/**
 * Test file output html builder class.
 */

var TestDocBuilder = (function (_DocBuilder) {
  function TestDocBuilder() {
    _classCallCheck(this, TestDocBuilder);

    _get(Object.getPrototypeOf(TestDocBuilder.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(TestDocBuilder, _DocBuilder);

  _createClass(TestDocBuilder, [{
    key: 'exec',

    /**
     * execute building output html.
     * @param {function(html: string, filePath: string)} callback - is called with output html.
     */
    value: function exec(callback) {
      var testDescribeDoc = this._find({ kind: 'testDescribe' })[0];
      if (!testDescribeDoc) return;

      var ice = this._buildLayoutDoc();
      var fileName = this._getOutputFileName(testDescribeDoc);
      var baseUrl = this._getBaseUrl(fileName);
      var title = this._getTitle('Test');

      ice.load('content', this._buildTestDocHTML());
      ice.attr('baseUrl', 'href', baseUrl);
      ice.text('title', title);
      callback(ice.html, fileName);
    }
  }, {
    key: '_buildTestDocHTML',

    /**
     * build whole test file output html.
     * @returns {string} html of whole test file.
     * @private
     */
    value: function _buildTestDocHTML() {
      var ice = new _iceCap2['default'](this._readTemplate('test.html'));
      var testDescribeHTML = this._buildTestDescribeDocHTML();
      ice.load('tests', testDescribeHTML);
      return ice.html;
    }
  }, {
    key: '_buildTestDescribeDocHTML',

    /**
     * build test describe list html.
     * @param {number} [depth=0] - test depth.
     * @param {string} [memberof] - target test.
     * @returns {string} html of describe list.
     * @private
     */
    value: function _buildTestDescribeDocHTML() {
      var _this = this;

      var depth = arguments[0] === undefined ? 0 : arguments[0];
      var memberof = arguments[1] === undefined ? null : arguments[1];

      var cond = { kind: 'testDescribe', testDepth: depth };
      if (memberof) cond.memberof = memberof;
      var describeDocs = this._orderedFind('testId asec', cond);
      var padding = undefined;
      var html = '';

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function () {
          var describeDoc = _step.value;

          var ice = new _iceCap2['default'](_this._readTemplate('testDescribe.html'));

          var testCount = _this._find({ kind: 'testIt', longname: { regex: new RegExp('^' + describeDoc.longname + '\\.') } }).length;
          padding = 10 * (depth + 1);
          ice.attr('testDescribe', 'data-test-depth', depth);
          ice.into('testDescribe', describeDoc, function (describeDoc, ice) {
            var descriptionHTML = _this._buildFileDocLinkHTML(describeDoc, describeDoc.description);

            var testTargetsHTML = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = (describeDoc._custom_test_targets || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var testTarget = _step2.value;

                testTargetsHTML.push(_this._buildDocLinkHTML(testTarget[0], testTarget[1]));
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                  _iterator2['return']();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            testTargetsHTML = testTargetsHTML.join('\n') || '-';

            ice.load('testDescription', descriptionHTML);
            ice.attr('testDescription', 'style', 'padding-left: ' + padding + 'px');
            ice.load('testTarget', testTargetsHTML);
            ice.text('testCount', testCount);
          });

          padding = 10 * (depth + 2);
          var itDocs = _this._orderedFind('testId asec', { kind: 'testIt', testDepth: depth + 1, memberof: describeDoc.longname });
          ice.loop('testIt', itDocs, function (i, itDoc, ice) {
            var descriptionHTML = _this._buildFileDocLinkHTML(itDoc, itDoc.description);

            var testTargetsHTML = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = (itDoc._custom_test_targets || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var testTarget = _step3.value;

                testTargetsHTML.push(_this._buildDocLinkHTML(testTarget[0], testTarget[1]));
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                  _iterator3['return']();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            testTargetsHTML = testTargetsHTML.join('\n') || '-';

            ice.attr('testIt', 'data-test-depth', depth + 1);
            ice.load('testDescription', descriptionHTML);
            ice.attr('testDescription', 'style', 'padding-left: ' + padding + 'px');
            ice.load('testTarget', testTargetsHTML);
          });

          var innerDescribeHTML = _this._buildTestDescribeDocHTML(depth + 1, describeDoc.longname);

          html += '\n' + ice.html + '\n' + innerDescribeHTML;
        };

        for (var _iterator = describeDocs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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

      return html;
    }
  }]);

  return TestDocBuilder;
})(_DocBuilderJs2['default']);

exports['default'] = TestDocBuilder;
module.exports = exports['default'];