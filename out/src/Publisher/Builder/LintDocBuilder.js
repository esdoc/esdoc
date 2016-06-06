'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._results = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _DocBuilder2 = require('./DocBuilder.js');

var _DocBuilder3 = _interopRequireDefault(_DocBuilder2);

var _ASTNodeContainer = require('../../Util/ASTNodeContainer.js');

var _ASTNodeContainer2 = _interopRequireDefault(_ASTNodeContainer);

var _InvalidCodeLogger = require('../../Util/InvalidCodeLogger.js');

var _InvalidCodeLogger2 = _interopRequireDefault(_InvalidCodeLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @ignore */
var _results = exports._results = [];

/**
 * Lint Output Builder class.
 */

var LintDocBuilder = function (_DocBuilder) {
  _inherits(LintDocBuilder, _DocBuilder);

  function LintDocBuilder() {
    _classCallCheck(this, LintDocBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LintDocBuilder).apply(this, arguments));
  }

  _createClass(LintDocBuilder, [{
    key: 'exec',

    /**
     * execute building output.
     */
    value: function exec() {
      var results = [];
      var docs = this._find({ kind: ['method', 'function'] });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var doc = _step.value;

          if (doc.undocument) continue;

          var node = _ASTNodeContainer2.default.getNode(doc.__docId__);
          var codeParams = this._getParamsFromNode(node);
          var docParams = this._getParamsFromDoc(doc);
          if (this._match(codeParams, docParams)) continue;

          results.push({ node: node, doc: doc, codeParams: codeParams, docParams: docParams });
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

      _results.push.apply(_results, results);

      this._showResult(results);
    }

    /**
     * get variable names of method argument.
     * @param {ASTNode} node - target node.
     * @returns {string[]} variable names.
     * @private
     */

  }, {
    key: '_getParamsFromNode',
    value: function _getParamsFromNode(node) {
      var params = void 0;
      switch (node.type) {
        case 'FunctionExpression':
        case 'FunctionDeclaration':
          params = node.params || [];
          break;
        case 'ClassMethod':
          params = node.params || [];
          break;
        default:
          throw new Error('unknown node type. type = ' + node.type);
      }

      var result = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = params[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var param = _step2.value;

          switch (param.type) {
            case 'Identifier':
              result.push(param.name);
              break;
            case 'AssignmentPattern':
              if (param.left.type === 'Identifier') {
                result.push(param.left.name);
              } else if (param.left.type === 'ObjectPattern') {
                result.push('*');
              }
              break;
            case 'RestElement':
              result.push(param.argument.name);
              break;
            case 'ObjectPattern':
              result.push('*');
              break;
            case 'ArrayPattern':
              result.push('*');
              break;
          }
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

      return result;
    }

    /**
     * get variable names of method argument.
     * @param {DocObject} doc - target doc object.
     * @returns {string[]} variable names.
     * @private
     */

  }, {
    key: '_getParamsFromDoc',
    value: function _getParamsFromDoc(doc) {
      var params = doc.params || [];
      return params.map(function (v) {
        return v.name;
      }).filter(function (v) {
        return !v.includes('.');
      });
    }
  }, {
    key: '_match',
    value: function _match(codeParams, docParams) {
      if (codeParams.length !== docParams.length) return false;

      for (var i = 0; i < codeParams.length; i++) {
        if (codeParams[i] === '*') {
          // nothing
        } else if (codeParams[i] !== docParams[i]) {
            return false;
          }
      }

      return true;
    }

    /**
     * show invalid lint code.
     * @param {Object[]} results - target results.
     * @param {DocObject} results[].doc
     * @param {ASTNode} results[].node
     * @param {string[]} results[].codeParams
     * @param {string[]} results[].docParams
     * @private
     */

  }, {
    key: '_showResult',
    value: function _showResult(results) {
      var sourceDir = _path2.default.dirname(_path2.default.resolve(this._config.source));
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = results[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var result = _step3.value;

          var doc = result.doc;
          var node = result.node;
          var filePath = doc.longname.split('~')[0];
          var name = doc.longname.split('~')[1];
          var absFilePath = _path2.default.resolve(sourceDir, filePath);
          var comment = node.leadingComments[node.leadingComments.length - 1];
          var startLineNumber = comment.loc.start.line;
          var endLineNumber = node.loc.start.line;
          var lines = _fsExtra2.default.readFileSync(absFilePath).toString().split('\n');
          var targetLines = [];

          for (var i = startLineNumber - 1; i < endLineNumber; i++) {
            targetLines.push(i + '| ' + lines[i]);
          }

          console.log('\u001b[33mwarning: signature mismatch: ' + name + ' ' + filePath + '#' + startLineNumber + '\u001b[32m');
          console.log(targetLines.join('\n'));
          console.log('[0m');
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
    }
  }]);

  return LintDocBuilder;
}(_DocBuilder3.default);

exports.default = LintDocBuilder;