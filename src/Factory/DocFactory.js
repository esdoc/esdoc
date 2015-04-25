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
    this._processedClassNodes = [];

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

    let results = this._traverseComments(parentNode, node, node.leadingComments);
    this._results.push(...results);

    // for trailing comments.
    // traverse with only last node, because prevent duplication of trailing comments.
    if (node.trailingComments && isLastNodeInParent) {
      let results = this._traverseComments(parentNode, null, node.trailingComments);
      this._results.push(...results);
    }
  }

  _traverseComments(parentNode, node, comments) {
    if (!node) {
      let virtualNode = {};
      Object.defineProperty(virtualNode, 'parent', {value: parentNode});
      node = virtualNode;
    }

    if (comments && comments.length) {
      let temp = [];
      for (let comment of comments) {
        if (CommentParser.isESDoc(comment)) temp.push(comment);
      }
      comments = temp;
    } else {
      comments = [];
    }

    if (comments.length === 0) {
      comments = [{type: 'Block', value: '* @undocument'}];
    }

    let results = [];
    let lastComment = comments[comments.length - 1];
    for (let comment of comments) {
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

    if (!type) return null;

    if (type === 'Class') {
      this._processedClassNodes.push(node);
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
        return this._decideClassDeclarationType(node);
      case 'MethodDefinition':
        return this._decideMethodDefinitionType(node);
      case 'ExpressionStatement':
        return this._decideExpressionStatementType(node);
      case 'FunctionDeclaration':
        return this._decideFunctionDeclarationType(node);
      case 'VariableDeclaration':
        return this._decideVariableType(node);
      case 'AssignmentExpression':
        return this._decideAssignmentType(node);
    }

    return {type: null, node: null};
  }

  _decideClassDeclarationType(node) {
    if (!this._isTopDepthInBody(node, this._ast.body)) return {type: null, node: null};

    return {type: 'Class', node: node};
  }

  _decideMethodDefinitionType(node) {
    let classNode = this._findUp(node, ['ClassDeclaration', 'ClassExpression']);
    if (this._processedClassNodes.includes(classNode)) {
      return {type: 'Method', node: node};
    } else {
      logger.w('this method is not in class', node);
      return {type: null, node: null};
    }
  }

  _decideFunctionDeclarationType(node) {
    if (!this._isTopDepthInBody(node, this._ast.body)) return {type: null, node: null};

    return {type: 'Function', node: node};
  }

  _decideExpressionStatementType(node) {
    let isTop = this._isTopDepthInBody(node, this._ast.body);

    Object.defineProperty(node.expression, 'parent', {value: node});
    node = node.expression;
    node[already] = true;

    let innerType;
    let innerNode;

    if (!node.right) return {type: null, node: null};

    switch (node.right.type) {
      case 'FunctionExpression':
        innerType = 'Function';
        break;
      case 'ClassExpression':
        innerType = 'Class';
        break;
      default:
        if (node.left.type === 'MemberExpression' && node.left.object.type === 'ThisExpression') {
          let classNode = this._findUp(node, ['ClassExpression', 'ClassDeclaration']);
          if (!this._processedClassNodes.includes(classNode)) {
            logger.w('this member is not in class.', node);
            return {type: null, node: null};
          }
          return {type: 'Member', node: node};
        } else {
          if (!isTop) return {type: null, node: null};
          return {type: 'Variable', node: node};
        }
    }

    if (!isTop) return {type: null, node: null};

    innerNode = node.right;
    innerNode.id = this._copy(node.left.id || node.left.property);
    Object.defineProperty(innerNode, 'parent', {value: node});
    innerNode[already] = true;

    return {type: innerType, node: innerNode};
  }

  _decideVariableType(node) {
    if (!this._isTopDepthInBody(node, this._ast.body)) return {type: null, node: null};

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
    Object.defineProperty(innerNode, 'parent', {value: node});
    innerNode[already] = true;

    return {type: innerType, node: innerNode};
  }

  _decideAssignmentType(node) {
    if (!this._isTopDepthInBody(node, this._ast.body)) return {type: null, node: null};

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
    Object.defineProperty(innerNode, 'parent', {value: node});
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

  _isTopDepthInBody(node, body) {
    if (!body) return false;
    if (!Array.isArray(body)) return false;

    let parentNode = node.parent;
    if (['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(parentNode.type)) {
      node = parentNode;
    }

    for (let _node of body) {
      if (node === _node) return true;
    }
    return false;
  }

  _copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  _findUp(node, types) {
    let parent = node.parent;
    while(parent) {
      if (types.includes(parent.type)) return parent;
      parent = parent.parent;
    }

    return null;
  }
}
