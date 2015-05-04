import assert from 'assert';
import CommentParser from '../Parser/CommentParser.js';
import TestDoc from '../Doc/TestDoc.js';
import TestFileDoc from '../Doc/TestFileDoc.js';

let already = Symbol('already');

/**
 * Test doc factory class.
 * @example
 * let factory = new TestDocFactory('mocha', ast, pathResolver);
 * factory.push(node, parentNode);
 * let results = factory.results;
 */
export default class TestDocFactory {
  /**
   * get unique id.
   * @returns {number} unique id.
   * @private
   */
  static _getUniqueId() {
    if (!this._sequence) /** @type {number} */ this._sequence = 0;

    return this._sequence++;
  }

  /**
   * @type {DocObject[]}
   */
  get results() {
    return [...this._results];
  }

  /**
   * create instance.
   * @param {string} type - test type. now support only 'mocha'.
   * @param {AST} ast - AST of test code.
   * @param {PathResolver} pathResolver - path resolver of test code.
   */
  constructor(type, ast, pathResolver) {
    type = type.toLowerCase();
    assert(type === 'mocha');

    /** @type {string} */
    this._type = type;

    /** @type {AST} */
    this._ast = ast;

    /** @type {PathResolver} */
    this._pathResolver = pathResolver;

    /** @type {DocObject[]} */
    this._results = [];

    // file doc
    let doc = new TestFileDoc(ast, ast, pathResolver, []);
    this._results.push(doc.value);
  }

  /**
   * push node, and factory process the node.
   * @param {ASTNode} node - target node.
   * @param {ASTNode} parentNode - parent node of target node.
   */
  push(node, parentNode) {
    if (node[already]) return;

    node[already] = true;
    Object.defineProperty(node, 'parent', {value: parentNode});

    if (this._type === 'mocha') this._pushForMocha(node, parentNode);
  }

  /**
   * push node as mocha test code.
   * @param {ASTNode} node - target node.
   * @private
   */
  _pushForMocha(node) {
    if (node.type !== 'ExpressionStatement') return;

    let expression = node.expression;
    if (expression.type !== 'CallExpression') return;

    if (!['describe', 'it', 'context', 'suite', 'test'].includes(expression.callee.name)) return;

    expression[already] = true;
    Object.defineProperty(expression, 'parent', {value: node});

    let tags = [];
    if (node.leadingComments && node.leadingComments.length) {
      let comment = node.leadingComments[node.leadingComments.length - 1];
      tags = CommentParser.parse(comment);
    }

    let uniqueId = this.constructor._getUniqueId();
    expression._esdocTestId = uniqueId;
    expression._esdocTestName = expression.callee.name + uniqueId;

    let testDoc = new TestDoc(this._ast, expression, this._pathResolver, tags);

    this._results.push(testDoc.value);
  }
}
