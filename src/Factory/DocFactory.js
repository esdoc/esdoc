import Logger from 'color-logger';
import CommentParser from '../Parser/CommentParser.js';
import FileDoc from '../Doc/FileDoc.js';
import ClassDoc from '../Doc/ClassDoc.js';
import MethodDoc from '../Doc/MethodDoc.js';
import MemberDoc from '../Doc/MemberDoc.js';
import FunctionDoc from '../Doc/FunctionDoc.js';
import VariableDoc from '../Doc/VariableDoc.js';
import AssignmentDoc from '../Doc/AssignmentDoc.js';
import TypedefDoc from '../Doc/TypedefDoc.js';
import ExternalDoc from '../Doc/ExternalDoc.js';

let already = Symbol('already');
let logger = new Logger('DocFactory');

export default class DocFactory {
  get results() {
    return [...this._results];
  }

  constructor(ast, pathResolver) {
    this._ast = ast;
    this._pathResolver = pathResolver;
    this._results = [];

    // file doc
    let doc = new FileDoc(ast, ast, pathResolver, []);
    this._results.push(doc.value);

    // ast does not child, so only comment.
    if (ast.body.length === 0 && ast.leadingComments) {
      let results = this._traverseComments(ast, null, ast.leadingComments);
      this._results.push(...results);
    }
  }

  push(node, parentNode) {
    if (node === this._ast) return;

    if (node[already]) return;

    let isLastNodeInParent = this._isLastNodeInParent(node, parentNode);

    node[already] = true;
    Object.defineProperty(node, 'parent', {value: parentNode});

    // unwrap export declaration
    if (['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(node.type)) {
      parentNode = node;
      node = this._unwrapExportDeclaration(node);
      node[already] = true;
      Object.defineProperty(node, 'parent', {value: parentNode});
    }

    // for leading comments
    if (node.leadingComments && node.leadingComments.length) {
      let results = this._traverseComments(parentNode, node, node.leadingComments);
      this._results.push(...results);
    } else {
      this._workOnNonCommentNode(parentNode, node);
    }

    // for trailing comments.
    // traverse with only last node, because prevent duplication of trailing comments.
    if (node.trailingComments && isLastNodeInParent) {
      let results = this._traverseComments(parentNode, null, node.trailingComments);
      this._results.push(...results);
    }
  }

  _workOnNonCommentNode(parentNode, node) {
    let isTopLevel = (node) =>{
      for (let _node of this._ast.body) {
        if (node === _node) return true;
      }
      return false;
    };

    let {type} = this._decideType([], node);
    let kind = null;
    switch (type) {
      case 'Class':
        kind = 'class';
        break;
      case 'Method':
        kind = 'method';
        break;
      case 'Member':
        kind = 'member';
        break;
      case 'Function':
        if (isTopLevel(node)) kind = 'function';
        break;
      case 'Variable':
        if (isTopLevel(node)) kind = 'variable';
        break;
      case 'Assignment':
        if (isTopLevel(node)) kind = 'variable';
        break;
    }

    if (kind !== null) {
      let comments = [{type: 'Block', value: `* @kind ${kind}`}];
      let results = this._traverseComments(parentNode, node, comments);
      this._results.push(...results);
    }
  }

  _traverseComments(parentNode, node, comments) {
    if (!node) {
      let virtualNode = {};
      Object.defineProperty(virtualNode, 'parent', {value: parentNode});
      node = virtualNode;
    }

    let results = [];
    let lastComment = comments[comments.length - 1];
    for (let comment of comments) {
      if (!CommentParser.isESDoc(comment)) continue;

      let tags = CommentParser.parse(comment);

      let doc;
      if (comment === lastComment) {
        doc = this._createDoc(node, tags);
      } else {
        let virtualNode = {};
        Object.defineProperty(virtualNode, 'parent', {value: parentNode});
        doc = this._createDoc(virtualNode, tags);
      }

      if (doc) results.push(doc.value);
    }

    return results;
  }

  _createDoc(node, tags) {
    let result = this._decideType(tags, node);
    let type = result.type;
    node = result.node;

    if (!type) {
      logger.w(`unresolve: ${node.type}`, node);
      return null;
    }

    let clazz;
    switch (type) {
      case 'Class':   clazz = ClassDoc; break;
      case 'Method':  clazz = MethodDoc; break;
      case 'Member':  clazz = MemberDoc; break;
      case 'Function': clazz = FunctionDoc; break;
      case 'Variable': clazz = VariableDoc; break;
      case 'Assignment': clazz = AssignmentDoc; break;
      case 'Typedef': clazz = TypedefDoc; break;
      case 'External': clazz = ExternalDoc; break;
    }

    if (!clazz) return;
    if (!node.type) node.type = type;

    return new clazz(this._ast, node, this._pathResolver, tags);
  }

  _decideType(tags, node) {
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

    if (type) return {type, node};

    if (!node) return {type, node};

    switch (node.type) {
      case 'ClassDeclaration':
        type = 'Class';
        break;
      case 'MethodDefinition':
        type = 'Method';
        break;
      case 'ExpressionStatement':
      {
        let result = this._decideExpressionStatementType(node);
        type = result.type;
        node = result.node;
      }
        break;
      case 'FunctionDeclaration':
        type = 'Function';
        break;
      case 'VariableDeclaration':
      {
        let result = this._decideVariableType(node);
        type = result.type;
        node = result.node;
      }
        break;
      case 'AssignmentExpression':
      {
        let result = this._decideAssignmentType(node);
        type = result.type;
        node = result.node;
      }
        break;
    }

    return {type, node};
  }

  _decideExpressionStatementType(node) {
    Object.defineProperty(node.expression, 'parent', {value: node.parent});
    node = node.expression;
    node[already] = true;

    let innerType = null;
    let innerNode = null;

    if (!node.right) return {type: innerType, node: innerNode};

    switch (node.right.type) {
      case 'FunctionExpression':
        innerType = 'Function';
        break;
      case 'ClassExpression':
        innerType = 'Class';
        break;
      default:
        if (node.left.type === 'MemberExpression' && node.left.object.type === 'ThisExpression') {
          return {type: 'Member', node: node};
        } else {
          return {type: 'Variable', node: node};
        }
    }

    innerNode = node.right;
    innerNode.id = this._copy(node.left.id || node.left.property);
    Object.defineProperty(innerNode, 'parent', {value: node.parent});
    innerNode[already] = true;

    return {type: innerType, node: innerNode};
  }

  _decideVariableType(node) {
    let innerType = null;
    let innerNode = null;

    if (!node.declarations[0].init) return {type: innerType, node: innerNode};

    switch (node.declarations[0].init.type) {
      case 'FunctionExpression':
        innerType = 'Function';
        break;
      case 'ClassExpression':
        innerType = 'Class';
        break;
      default:
        return {type: 'Variable', node: node};
    }

    innerNode = node.declarations[0].init;
    innerNode.id = this._copy(node.declarations[0].id);
    Object.defineProperty(innerNode, 'parent', {value: node.parent});
    innerNode[already] = true;

    return {type: innerType, node: innerNode};
  }

  _decideAssignmentType(node) {
    let innerType;
    let innerNode;

    switch (node.right.type) {
      case 'FunctionExpression':
        innerType = 'Function';
        break;
      case 'ClassExpression':
        innerType = 'Class';
        break;
      default:
        return {type: 'Assignment', node: node};
    }

    innerNode = node.right;
    innerNode.id = this._copy(node.left.id || node.left.property);
    Object.defineProperty(innerNode, 'parent', {value: node.parent});
    innerNode[already] = true;

    return {type: innerType, node: innerNode};
  }

  _unwrapExportDeclaration(node) {
    let exportedASTNode = node.declaration;
    if (!exportedASTNode.leadingComments) exportedASTNode.leadingComments = [];
    exportedASTNode.leadingComments.push(...node.leadingComments || []);

    if (!exportedASTNode.trailingComments) exportedASTNode.trailingComments = [];
    exportedASTNode.trailingComments.push(...node.trailingComments || []);

    return exportedASTNode;
  }

  _isLastNodeInParent(node, parentNode) {
    if (parentNode && parentNode.body) {
      let lastNode = parentNode.body[parentNode.body.length - 1];
      return node === lastNode;
    }

    return false;
  }

  _copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
