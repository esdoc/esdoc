import Logger from '../Util/Logger.js';
import CommentParser from '../Parser/CommentParser.js';
import FileDoc from '../Doc/FileDoc.js';
import ClassDoc from '../Doc/ClassDoc.js';
import MethodDoc from '../Doc/MethodDoc.js';
import MemberDoc from '../Doc/MemberDoc.js';
import FunctionDoc from '../Doc/FunctionDoc.js';
import VariableDoc from '../Doc/VariableDoc.js';
import TypedefDoc from '../Doc/TypedefDoc.js';
import ExternalDoc from '../Doc/ExternalDoc.js';

let already = Symbol('already');
let TAG = 'DocFactory';

export default class DocFactory {
  static create(ast, node, parentNode, pathResolver) {
    if (node[already]) return [];

    let results = [];

    // for ast
    if (node.type === 'Program') {
      let doc = new FileDoc(ast, node, pathResolver, []);
      results.push(doc.value);

      // ast does not child, so only comment.
      if (ast.body.length === 0 && ast.leadingComments) {
        for (let comment of ast.leadingComments) {
          let tags = CommentParser.parse(comment);
          let virtualNode = {};
          Object.defineProperty(virtualNode, 'parent', {value: ast});
          doc = this.createDoc(ast, virtualNode, tags, pathResolver);
          if (doc) {
            results.push(doc.value);
          }
        }
      }

      return results;
    }

    let isLastNodeInParent = this._isLastNodeInParent(node, parentNode);

    node[already] = true;
    Object.defineProperty(node, 'parent', {value: parentNode});

    if (['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(node.type)) {
      parentNode = node;
      node = this.unwrapExportDeclaration(node);
      node[already] = true;
      Object.defineProperty(node, 'parent', {value: parentNode});
    }

    if (!node.leadingComments) node.leadingComments = [];
    if (!node.trailingComments) node.trailingComments = [];

    // leading comments
    for (let i = 0; i < node.leadingComments.length; i++) {
      let comment = node.leadingComments[i];
      if (!CommentParser.isESDoc(comment)) continue;
      let tags = CommentParser.parse(comment);

      let doc;
      if (i + 1 === node.leadingComments.length) {
        doc = this.createDoc(ast, node, tags, pathResolver);
      } else {
        let virtualNode = {};
        Object.defineProperty(virtualNode, 'parent', {value: parentNode});
        doc = this.createDoc(ast, virtualNode, tags, pathResolver);
      }

      if (doc) {
        results.push(doc.value);
      }
    }

    // trailing comments
    if (isLastNodeInParent) {
      for (let i = 0; i < node.trailingComments.length; i++) {
        let comment = node.trailingComments[i];
        let tags = CommentParser.parse(comment);
        let virtualNode = {};
        Object.defineProperty(virtualNode, 'parent', {value: parentNode});
        let doc = this.createDoc(ast, virtualNode, tags, pathResolver);
        if (doc) {
          results.push(doc.value);
        }
      }
    }

    // only comment
    if (ast.body.length === 0 && ast.leadingComments) {
      for (let comment of ast.leadingComments) {
        let tags = CommentParser.parse(comment);
        let virtualNode = {};
        Object.defineProperty(virtualNode, 'parent', {value: parentNode});
        let doc = this.createDoc(ast, virtualNode, tags, pathResolver);
        if (doc) {
          results.push(doc.value);
        }
      }
    }

    return results;
  }

  static createDoc(ast, node, tags, pathResolver) {
    let type = this.decideType(tags, node);
    if (!type) return null;

    let clazz;
    switch (type) {
      case 'Class':   clazz = ClassDoc; break;
      case 'Method':  clazz = MethodDoc; break;
      case 'Member':  clazz = MemberDoc; break;
      case 'Function': clazz = FunctionDoc; break;
      case 'Variable': clazz = VariableDoc; break;
      case 'Typedef': clazz = TypedefDoc; break;
      case 'External': clazz = ExternalDoc; break;
      default: Logger.w(TAG, `unresolve: ${type}`);
    }

    if (!clazz) return;
    if (!node.type) node.type = type;

    return new clazz(ast, node, pathResolver, tags);
  }

  static decideType(tags, node) {
    let type = null;
    for (let tag of tags) {
      let tagName = tag.tagName;
      switch (tagName) {
        case '@class':    type = 'Class'; break;
        case '@member':   type = 'Member'; break;
        case '@method':   type = 'Method'; break;
        case '@function': type = 'Function'; break;
        case '@var':      type = 'Variable'; break;
        case '@typedef':  type = 'Typedef'; break;
        case '@external': type = 'External'; break;
      }
    }

    if (type) return type;

    if (!node) return type;

    switch (node.type) {
      case 'ClassDeclaration':    type = 'Class'; break;
      case 'MethodDefinition':    type = 'Method'; break;
      case 'ExpressionStatement': type = 'Member'; break;
      case 'FunctionDeclaration': type = 'Function'; break;
      case 'VariableDeclaration': type = 'Variable'; break;
      case 'AssignmentExpression': type = 'Variable'; break;
      default: Logger.w(TAG, `unresolve: ${node.type}`);
    }

    return type;
  }

  static unwrapExportDeclaration(astNode) {
    let exportedASTNode = astNode.declaration;
    if (!exportedASTNode.leadingComments) exportedASTNode.leadingComments = [];
    exportedASTNode.leadingComments.push(...astNode.leadingComments || []);

    if (!exportedASTNode.trailingComments) exportedASTNode.trailingComments = [];
    exportedASTNode.trailingComments.push(...astNode.trailingComments || []);

    return exportedASTNode;
  }

  static _isLastNodeInParent(node, parentNode) {
    if (parentNode && parentNode.body) {
      let lastNode = parentNode.body[parentNode.body.length - 1];
      return node === lastNode;
    }

    return false;
  }
}
