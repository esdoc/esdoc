'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _iceCap = require('ice-cap');

var _iceCap2 = _interopRequireDefault(_iceCap);

var _DocBuilder2 = require('./DocBuilder.js');

var _DocBuilder3 = _interopRequireDefault(_DocBuilder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Test file output html builder class.
 */

var TestDocBuilder = function (_DocBuilder) {
  _inherits(TestDocBuilder, _DocBuilder);

  function TestDocBuilder() {
    _classCallCheck(this, TestDocBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TestDocBuilder).apply(this, arguments));
  }

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

    /**
     * build whole test file output html.
     * @returns {string} html of whole test file.
     * @private
     */

  }, {
    key: '_buildTestDocHTML',
    value: function _buildTestDocHTML() {
      var ice = new _iceCap2.default(this._readTemplate('test.html'));
      var testDescribeHTML = this._buildTestDescribeDocHTML();
      ice.load('tests', testDescribeHTML);
      return ice.html;
    }

    /**
     * build test describe list html.
     * @param {number} [depth=0] - test depth.
     * @param {string} [memberof] - target test.
     * @returns {string} html of describe list.
     * @private
     */

  }, {
    key: '_buildTestDescribeDocHTML',
    value: function _buildTestDescribeDocHTML() {
      var _this2 = this;

      var depth = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var memberof = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      var cond = { kind: 'testDescribe', testDepth: depth };
      if (memberof) cond.memberof = memberof;
      var describeDocs = this._orderedFind('testId asec', cond);
      var padding = void 0;
      var html = '';

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var describeDoc = _step.value;

          var ice = new _iceCap2.default(_this2._readTemplate('testDescribe.html'));

          var testCount = _this2._find({ kind: 'testIt', longname: { regex: new RegExp('^' + describeDoc.longname + '\\.') } }).length;
          padding = 10 * (depth + 1);
          ice.attr('testDescribe', 'data-test-depth', depth);
          ice.into('testDescribe', describeDoc, function (describeDoc, ice) {
            var descriptionHTML = _this2._buildFileDocLinkHTML(describeDoc, describeDoc.description);

            var testTargetsHTML = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = (describeDoc._custom_test_targets || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var testTarget = _step2.value;

                testTargetsHTML.push(_this2._buildDocLinkHTML(testTarget[0], testTarget[1]));
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
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
          var itDocs = _this2._orderedFind('testId asec', { kind: 'testIt', testDepth: depth + 1, memberof: describeDoc.longname });
          ice.loop('testIt', itDocs, function (i, itDoc, ice) {
            var descriptionHTML = _this2._buildFileDocLinkHTML(itDoc, itDoc.description);

            var testTargetsHTML = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = (itDoc._custom_test_targets || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var testTarget = _step3.value;

                testTargetsHTML.push(_this2._buildDocLinkHTML(testTarget[0], testTarget[1]));
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
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

          var innerDescribeHTML = _this2._buildTestDescribeDocHTML(depth + 1, describeDoc.longname);

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
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
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
}(_DocBuilder3.default);

exports.default = TestDocBuilder;
module.exports = exports['default'];