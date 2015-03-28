import CommentParser from '../Parser/CommentParser.js';
import Tag2Value from './Tag2Value.js';
import ClassDoc from '../Doc/ClassDoc.js';
import MethodDoc from '../Doc/MethodDoc.js';
import TypedefDoc from '../Doc/TypedefDoc.js';
import MemberDoc from '../Doc/MemberDoc.js';

let already = Symbol('already');

export default class DocFactory {
  static create(ast, node, parentNode, pathResolver) {
    if (node[already]) return [];

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

    let results = [];

    // leading comments
    for (let i = 0; i < node.leadingComments.length; i++) {
      let comment = node.leadingComments[i];
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
        let tag2value = new Tag2Value(tags, doc.tags);
        results.push(tag2value.value);
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
          let tag2value = new Tag2Value(tags, doc.tags);
          results.push(tag2value.value);
        }
      }
    }

    return results;
  }

  static createDoc(ast, node, tags, pathResolver) {
    let type = this.decideType(tags, node);
    let clazz;

    if (!type) return null;

    switch (type) {
      case 'Class':   clazz = ClassDoc; break;
      case 'Method':  clazz = MethodDoc; break;
      case 'Member':  clazz = MemberDoc; break;
      case 'Variable': break;
      case 'Typedef': clazz = TypedefDoc; break;
      default: console.log(`unresolve: ${type}`);
    }

    if (!clazz) return;
    if (!node.type) node.type = type;

    return new clazz(ast, node, pathResolver);
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
        case '@callback': type = 'Callback'; break;
        case '@event':    type = 'Event'; break;
      }
    }

    if (type) return type;

    if (!node) return type;

    switch (node.type) {
      case 'ClassDeclaration':    type = 'Class'; break;
      case 'MethodDefinition':    type = 'Method'; break;
      case 'ExpressionStatement': type = 'Member'; break;
      case 'VariableDeclaration': type = 'Variable'; break;
      default: console.log(`unresolve: ${node.type}`);
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
