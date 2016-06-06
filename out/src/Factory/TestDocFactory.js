'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _CommentParser = require('../Parser/CommentParser.js');

var _CommentParser2 = _interopRequireDefault(_CommentParser);

var _TestDoc = require('../Doc/TestDoc.js');

var _TestDoc2 = _interopRequireDefault(_TestDoc);

var _TestFileDoc = require('../Doc/TestFileDoc.js');

var _TestFileDoc2 = _interopRequireDefault(_TestFileDoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var already = Symbol('already');

/**
 * Test doc factory class.
 * @example
 * let factory = new TestDocFactory('mocha', ast, pathResolver);
 * factory.push(node, parentNode);
 * let results = factory.results;
 */

var TestDocFactory = function () {
  _createClass(TestDocFactory, [{
    key: 'results',


    /**
     * @type {DocObject[]}
     */
    get: function get() {
      return [].concat(_toConsumableArray(this._results));
    }

    /**
     * create instance.
     * @param {string} type - test type. now support only 'mocha'.
     * @param {AST} ast - AST of test code.
     * @param {PathResolver} pathResolver - path resolver of test code.
     */

  }], [{
    key: '_getUniqueId',

    /**
     * get unique id.
     * @returns {number} unique id.
     * @private
     */
    value: function _getUniqueId() {
      if (!this._sequence) /** @type {number} */this._sequence = 0;

      return this._sequence++;
    }
  }]);

  function TestDocFactory(type, ast, pathResolver) {
    _classCallCheck(this, TestDocFactory);

    type = type.toLowerCase();
    (0, _assert2.default)(type === 'mocha');

    /** @type {string} */
    this._type = type;

    /** @type {AST} */
    this._ast = ast;

    /** @type {PathResolver} */
    this._pathResolver = pathResolver;

    /** @type {DocObject[]} */
    this._results = [];

    // file doc
    var doc = new _TestFileDoc2.default(ast, ast, pathResolver, []);
    this._results.push(doc.value);
  }

  /**
   * push node, and factory process the node.
   * @param {ASTNode} node - target node.
   * @param {ASTNode} parentNode - parent node of target node.
   */


  _createClass(TestDocFactory, [{
    key: 'push',
    value: function push(node, parentNode) {
      if (node[already]) return;

      node[already] = true;
      Object.defineProperty(node, 'parent', { value: parentNode });

      if (this._type === 'mocha') this._pushForMocha(node, parentNode);
    }

    /**
     * push node as mocha test code.
     * @param {ASTNode} node - target node.
     * @private
     */

  }, {
    key: '_pushForMocha',
    value: function _pushForMocha(node) {
      if (node.type !== 'ExpressionStatement') return;

      var expression = node.expression;
      if (expression.type !== 'CallExpression') return;

      if (!['describe', 'it', 'context', 'suite', 'test'].includes(expression.callee.name)) return;

      expression[already] = true;
      Object.defineProperty(expression, 'parent', { value: node });

      var tags = [];
      if (node.leadingComments && node.leadingComments.length) {
        var comment = node.leadingComments[node.leadingComments.length - 1];
        tags = _CommentParser2.default.parse(comment);
      }

      var uniqueId = this.constructor._getUniqueId();
      expression._esdocTestId = uniqueId;
      expression._esdocTestName = expression.callee.name + uniqueId;

      var testDoc = new _TestDoc2.default(this._ast, expression, this._pathResolver, tags);

      this._results.push(testDoc.value);
    }
  }]);

  return TestDocFactory;
}();

exports.default = TestDocFactory;
module.exports = exports['default'];