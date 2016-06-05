import logger from 'color-logger';
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
import ASTUtil from '../Util/ASTUtil.js';

let already = Symbol('already');

/**
 * Doc factory class.
 *
 * @example
 * let factory = new DocFactory(ast, pathResolver);
 * factory.push(node, parentNode);
 * let results = factory.results;
 */
export default class DocFactory {
  /**
   * @type {DocObject[]}
   */
  get results() {
    return [...this._results];
  }

  /**
   * create instance.
   * @param {AST} ast - AST of source code.
   * @param {PathResolver} pathResolver - path resolver of source code.
   */
  constructor(ast, pathResolver) {
    this._ast = Array.isArray(ast.body) ? ast : ast.program;
    this._pathResolver = pathResolver;
    this._results = [];
    this._processedClassNodes = [];

    this._inspectExportDefaultDeclaration();
    this._inspectExportNamedDeclaration();

    // file doc
    let doc = new FileDoc(this._ast, this._ast, pathResolver, []);
    this._results.push(doc.value);

    // ast does not child, so only comment.
    if (this._ast.body.length === 0 && (this._ast.leadingComments || this._ast.trailingComments)) {
      let results = this._traverseComments(this._ast, null, this._ast.leadingComments || this._ast.trailingComments);
      this._results.push(...results);
    }
  }

  /**
   * inspect ExportDefaultDeclaration.
   *
   * case1: separated export
   *
   * ```javascript
   * class Foo {}
   * export default Foo;
   * ```
   *
   * case2: export instance(directly).
   *
   * ```javascript
   * class Foo {}
   * export default new Foo();
   * ```
   *
   * case3: export instance(indirectly).
   *
   * ```javascript
   * class Foo {}
   * let foo = new Foo();
   * export default foo;
   * ```
   *
   * @private
   * @todo support function export.
   */
  _inspectExportDefaultDeclaration() {
    let pseudoExportNodes = [];

    for (let exportNode of this._ast.body) {
      if (exportNode.type !== 'ExportDefaultDeclaration') continue;

      let targetClassName = null;
      let targetVariableName = null;
      let pseudoClassExport;

      switch(exportNode.declaration.type) {
        case 'NewExpression':
          if (exportNode.declaration.callee.type === 'Identifier') {
            targetClassName = exportNode.declaration.callee.name;
          } else if (exportNode.declaration.callee.type === 'MemberExpression') {
            targetClassName = exportNode.declaration.callee.property.name;
          } else {
            targetClassName = '';
          }
          targetVariableName = targetClassName.replace(/^./, c => c.toLowerCase());
          pseudoClassExport = true;
          break;
        case 'Identifier':
          let varNode = ASTUtil.findVariableDeclarationAndNewExpressionNode(exportNode.declaration.name, this._ast);
          if (varNode) {
            targetClassName = varNode.declarations[0].init.callee.name;
            targetVariableName = exportNode.declaration.name;
            pseudoClassExport = true;
            ASTUtil.sanitize(varNode);
          } else {
            targetClassName = exportNode.declaration.name;
            pseudoClassExport = false;
          }
          break;
        default:
          logger.w(`unknown export declaration type. type = "${exportNode.declaration.type}"`);
          break;
      }

      let classNode = ASTUtil.findClassDeclarationNode(targetClassName, this._ast);
      if (classNode) {
        let pseudoExportNode1 = this._copy(exportNode);
        pseudoExportNode1.declaration = this._copy(classNode);
        pseudoExportNode1.leadingComments = null;
        pseudoExportNode1.declaration.__esdoc__pseudo_export = pseudoClassExport;
        pseudoExportNodes.push(pseudoExportNode1);

        if (targetVariableName) {
          let pseudoExportNode2 = this._copy(exportNode);
          pseudoExportNode2.declaration = ASTUtil.createVariableDeclarationAndNewExpressionNode(targetVariableName, targetClassName, exportNode.loc);
          pseudoExportNodes.push(pseudoExportNode2);
        }

        ASTUtil.sanitize(classNode);
        ASTUtil.sanitize(exportNode);
      }

      let functionNode = ASTUtil.findFunctionDeclarationNode(exportNode.declaration.name, this._ast);
      if (functionNode) {
        let pseudoExportNode = this._copy(exportNode);
        pseudoExportNode.declaration = this._copy(functionNode);
        ASTUtil.sanitize(exportNode);
        ASTUtil.sanitize(functionNode);
        pseudoExportNodes.push(pseudoExportNode);
      }

      let variableNode = ASTUtil.findVariableDeclarationNode(exportNode.declaration.name, this._ast);
      if (variableNode) {
        let pseudoExportNode = this._copy(exportNode);
        pseudoExportNode.declaration = this._copy(variableNode);
        ASTUtil.sanitize(exportNode);
        ASTUtil.sanitize(variableNode);
        pseudoExportNodes.push(pseudoExportNode);
      }
    }

    this._ast.body.push(...pseudoExportNodes);
  }

  /**
   * inspect ExportNamedDeclaration.
   *
   * case1: separated export
   *
   * ```javascript
   * class Foo {}
   * export {Foo};
   * ```
   *
   * case2: export instance(indirectly).
   *
   * ```javascript
   * class Foo {}
   * let foo = new Foo();
   * export {foo};
   * ```
   *
   * @private
   * @todo support function export.
   */
  _inspectExportNamedDeclaration() {
    let pseudoExportNodes = [];

    for (let exportNode of this._ast.body) {
      if (exportNode.type !== 'ExportNamedDeclaration') continue;

      if (exportNode.declaration && exportNode.declaration.type === 'VariableDeclaration') {
        for (let declaration of exportNode.declaration.declarations) {
          if (!declaration.init || declaration.init.type !== 'NewExpression') continue;

          let classNode = ASTUtil.findClassDeclarationNode(declaration.init.callee.name, this._ast);
          if (classNode) {
            let pseudoExportNode = this._copy(exportNode);
            pseudoExportNode.declaration = this._copy(classNode);
            pseudoExportNode.leadingComments = null;
            pseudoExportNodes.push(pseudoExportNode);
            pseudoExportNode.declaration.__esdoc__pseudo_export = true;
            ASTUtil.sanitize(classNode);
          }
        }
        continue;
      }

      for (let specifier of exportNode.specifiers) {
        if (specifier.type !== 'ExportSpecifier') continue;

        let targetClassName = null;
        let pseudoClassExport;

        let varNode = ASTUtil.findVariableDeclarationAndNewExpressionNode(specifier.exported.name, this._ast);
        if (varNode) {
          targetClassName = varNode.declarations[0].init.callee.name;
          pseudoClassExport = true;

          let pseudoExportNode = this._copy(exportNode);
          pseudoExportNode.declaration = this._copy(varNode);
          pseudoExportNode.specifiers = null;
          pseudoExportNodes.push(pseudoExportNode);

          ASTUtil.sanitize(varNode);
        } else {
          targetClassName = specifier.exported.name;
          pseudoClassExport = false;
        }

        let classNode = ASTUtil.findClassDeclarationNode(targetClassName, this._ast);
        if (classNode) {
          let pseudoExportNode = this._copy(exportNode);
          pseudoExportNode.declaration = this._copy(classNode);
          pseudoExportNode.leadingComments = null;
          pseudoExportNode.specifiers = null;
          pseudoExportNode.declaration.__esdoc__pseudo_export = pseudoClassExport;
          pseudoExportNodes.push(pseudoExportNode);
          ASTUtil.sanitize(classNode);
        }

        let functionNode = ASTUtil.findFunctionDeclarationNode(specifier.exported.name, this._ast);
        if (functionNode) {
          let pseudoExportNode = this._copy(exportNode);
          pseudoExportNode.declaration = this._copy(functionNode);
          pseudoExportNode.leadingComments = null;
          pseudoExportNode.specifiers = null;
          ASTUtil.sanitize(functionNode);
          pseudoExportNodes.push(pseudoExportNode);
        }

        let variableNode = ASTUtil.findVariableDeclarationNode(specifier.exported.name, this._ast);
        if (variableNode) {
          let pseudoExportNode = this._copy(exportNode);
          pseudoExportNode.declaration = this._copy(variableNode);
          pseudoExportNode.leadingComments = null;
          pseudoExportNode.specifiers = null;
          ASTUtil.sanitize(variableNode);
          pseudoExportNodes.push(pseudoExportNode);
        }
      }
    }

    this._ast.body.push(...pseudoExportNodes);
  }

  /**
   * push node, and factory processes node.
   * @param {ASTNode} node - target node.
   * @param {ASTNode} parentNode - parent node of target node.
   */
  push(node, parentNode) {
    if (node === this._ast) return;

// console.log('!! DocFactory - push - node.type: ' + node.type);
    if (node[already]) return;

    let isLastNodeInParent = this._isLastNodeInParent(node, parentNode);

    node[already] = true;
    Object.defineProperty(node, 'parent', {value: parentNode});

    // unwrap export declaration
    if (['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(node.type)) {
      parentNode = node;
      node = this._unwrapExportDeclaration(node);
      if (!node) return;
      node[already] = true;
      Object.defineProperty(node, 'parent', {value: parentNode});
    }

    let results;
    results = this._traverseComments(parentNode, node, node.leadingComments);
    this._results.push(...results);

    // for trailing comments.
    // traverse with only last node, because prevent duplication of trailing comments.
    if (node.trailingComments && isLastNodeInParent) {
      results = this._traverseComments(parentNode, null, node.trailingComments);
      this._results.push(...results);
    }
  }

  /**
   * traverse comments of node, and create doc object.
   * @param {ASTNode|AST} parentNode - parent of target node.
   * @param {?ASTNode} node - target node.
   * @param {ASTNode[]} comments - comment nodes.
   * @returns {DocObject[]} created doc objects.
   * @private
   */
  _traverseComments(parentNode, node, comments) {
    if (!node) {
      let virtualNode = {};
      Object.defineProperty(virtualNode, 'parent', {value: parentNode});
      node = virtualNode;
    }

    // hack: leadingComment of MethodDefinition with Literal is not valid by espree(v2.0.2)
    //if (node.type === 'MethodDefinition' && node.key.type === 'Literal') {
    // todo: switch espree to acorn
    if (node.type === 'MethodDefinition' && (node.computed || !node.key.name)) {
      let line = node.loc.start.line - 1;
      for (let comment of this._ast.comments || []) {
        if (comment.loc.end.line === line) {
          comments = [comment];
          break;
        }
      }
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
      comments = [{type: 'CommentBlock', value: '* @_undocument'}];
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

  /**
   * create Doc.
   * @param {ASTNode} node - target node.
   * @param {Tag[]} tags - tags of target node.
   * @returns {AbstractDoc} created Doc.
   * @private
   */
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

  /**
   * decide Doc type by using tags and node.
   * @param {Tag[]} tags - tags of node.
   * @param {ASTNode} node - target node.
   * @returns {{type: ?string, node: ?ASTNode}} decided type.
   * @private
   */
  _decideType(tags, node) {
    let type = null;
    for (let tag of tags) {
      let tagName = tag.tagName;
      switch (tagName) {
        case '@_class':    type = 'Class'; break;
        case '@_member':   type = 'Member'; break;
        case '@_method':   type = 'Method'; break;
        case '@_function': type = 'Function'; break;
        case '@_var':      type = 'Variable'; break;
        case '@typedef':  type = 'Typedef'; break;
        case '@external': type = 'External'; break;
      }
    }

//console.log('!! DocFactory - _decideType - node.type: ' + node.type);

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

  /**
   * decide Doc type from class declaration node.
   * @param {ASTNode} node - target node that is class declaration node.
   * @returns {{type: string, node: ASTNode}} decided type.
   * @private
   */
  _decideClassDeclarationType(node) {
    if (!this._isTopDepthInBody(node, this._ast.body)) return {type: null, node: null};

    return {type: 'Class', node: node};
  }

  /**
   * decide Doc type from method definition node.
   * @param {ASTNode} node - target node that is method definition node.
   * @returns {{type: ?string, node: ?ASTNode}} decided type.
   * @private
   */
  _decideMethodDefinitionType(node) {
    let classNode = this._findUp(node, ['ClassDeclaration', 'ClassExpression']);
    if (this._processedClassNodes.includes(classNode)) {
      return {type: 'Method', node: node};
    } else {
      logger.w('this method is not in class', node);
      return {type: null, node: null};
    }
  }

  /**
   * decide Doc type from function declaration node.
   * @param {ASTNode} node - target node that is function declaration node.
   * @returns {{type: string, node: ASTNode}} decided type.
   * @private
   */
  _decideFunctionDeclarationType(node) {
    if (!this._isTopDepthInBody(node, this._ast.body)) return {type: null, node: null};

    return {type: 'Function', node: node};
  }

  /**
   * decide Doc type from expression statement node.
   * @param {ASTNode} node - target node that is expression statement node.
   * @returns {{type: ?string, node: ?ASTNode}} decided type.
   * @private
   */
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
          // ``this[prop] = 123`` is dynamic member. so it cat not generate documentation.
          if (node.left.computed) {
            return {type: null, node: null};
          }

          let classNode = this._findUp(node, ['ClassExpression', 'ClassDeclaration']);
          if (!this._processedClassNodes.includes(classNode)) {
            logger.w('this member is not in class.', this._pathResolver.filePath, node);
            return {type: null, node: null};
          }

          return {type: 'Member', node: node};
        } else {
          return {type: null, node: null};
        }
    }

    if (!isTop) return {type: null, node: null};

    innerNode = node.right;
    innerNode.id = this._copy(node.left.id || node.left.property);
    Object.defineProperty(innerNode, 'parent', {value: node});
    innerNode[already] = true;

    return {type: innerType, node: innerNode};
  }

  /**
   * decide Doc type from variable node.
   * @param {ASTNode} node - target node that is variable node.
   * @returns {{type: string, node: ASTNode}} decided type.
   * @private
   */
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

  /**
   * decide Doc type from assignment node.
   * @param {ASTNode} node - target node that is assignment node.
   * @returns {{type: string, node: ASTNode}} decided type.
   * @private
   */
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

  /**
   * unwrap exported node.
   * @param {ASTNode} node - target node that is export declaration node.
   * @returns {ASTNode|null} unwrapped child node of exported node.
   * @private
   */
  _unwrapExportDeclaration(node) {
    // e.g. `export A from './A.js'` has not declaration
    if (!node.declaration) return null;

    let exportedASTNode = node.declaration;
    if (!exportedASTNode.leadingComments) exportedASTNode.leadingComments = [];
    exportedASTNode.leadingComments.push(...node.leadingComments || []);

    if (!exportedASTNode.trailingComments) exportedASTNode.trailingComments = [];
    exportedASTNode.trailingComments.push(...node.trailingComments || []);

    return exportedASTNode;
  }

  /**
   * judge node is last in parent.
   * @param {ASTNode} node - target node.
   * @param {ASTNode} parentNode - target parent node.
   * @returns {boolean} if true, the node is last in parent.
   * @private
   */
  _isLastNodeInParent(node, parentNode) {
    if (parentNode && parentNode.body) {
      let lastNode = parentNode.body[parentNode.body.length - 1];
      return node === lastNode;
    }

    return false;
  }

  /**
   * judge node is top in body.
   * @param {ASTNode} node - target node.
   * @param {ASTNode[]} body - target body node.
   * @returns {boolean} if true, the node is top in body.
   * @private
   */
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

  /**
   * deep copy object.
   * @param {Object} obj - target object.
   * @return {Object} copied object.
   * @private
   */
  _copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * find node while goes up.
   * @param {ASTNode} node - start node.
   * @param {string[]} types - ASTNode types.
   * @returns {ASTNode|null} found first node.
   * @private
   */
  _findUp(node, types) {
    let parent = node.parent;
    while(parent) {
      if (types.includes(parent.type)) return parent;
      parent = parent.parent;
    }

    return null;
  }
}
