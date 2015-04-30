import assert from 'assert';
import CommentParser from '../Parser/CommentParser.js';
import TestDoc from '../Doc/TestDoc.js';
import TestFileDoc from '../Doc/TestFileDoc.js';

let already = Symbol('already');

export default class TestDocFactory {
  static _getUniqueId(prefix = '') {
    if (!this._sequence) this._sequence = 0;

    return prefix + this._sequence++;
  }

  get results() {
    return [...this._results];
  }

  constructor(type, ast, pathResolver) {
    assert(type === 'Mocha');

    this._type = type;
    this._ast = ast;
    this._pathResolver = pathResolver;
    this._results = [];

    // file doc
    let doc = new TestFileDoc(ast, ast, pathResolver, []);
    this._results.push(doc.value);
  }

  push(node, parentNode) {
    if (node[already]) return;

    node[already] = true;
    Object.defineProperty(node, 'parent', {value: parentNode});

    if (this._type === 'Mocha') this._pushForMocha(node, parentNode);
  }

  _pushForMocha(node) {
    if (node.type !== 'ExpressionStatement') return;

    let expression = node.expression;
    if (expression.type !== 'CallExpression') return;

    if (!['describe', 'it'].includes(expression.callee.name)) return;

    expression[already] = true;
    Object.defineProperty(expression, 'parent', {value: node});

    let tags = [];
    if (node.leadingComments && node.leadingComments.length) {
      let comment = node.leadingComments[node.leadingComments.length - 1];
      tags = CommentParser.parse(comment);
    }

    expression._esdocTestId = this.constructor._getUniqueId(expression.callee.name);

    let testDoc = new TestDoc(this._ast, expression, this._pathResolver, tags);

    this._results.push(testDoc.value);
  }
}
