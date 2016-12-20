import Logger from 'color-logger';
import CommentParser from '../Parser/CommentParser.js';
import FileDoc from '../Doc/FileDoc.js';
import ClassDoc from '../Doc/ClassDoc.js';
import MethodDoc from '../Doc/MethodDoc.js';
import ClassProperty from '../Doc/ClassPropertyDoc';
import MemberDoc from '../Doc/MemberDoc.js';
import FunctionDoc from '../Doc/FunctionDoc.js';
import VariableDoc from '../Doc/VariableDoc.js';
import AssignmentDoc from '../Doc/AssignmentDoc.js';
import TypedefDoc from '../Doc/TypedefDoc.js';
import ExternalDoc from '../Doc/ExternalDoc.js';
import ASTUtil from '../Util/ASTUtil.js';

const already = Symbol('already');
const logger = new Logger('DocFactory');

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
    this._ast = ast;
    this._pathResolver = pathResolver;
    this._results = [];
    this._processedClassNodes = [];

    this._inspectExportDefaultDeclaration();
    this._inspectExportNamedDeclaration();

    // file doc
    const doc = new FileDoc(ast, ast, pathResolver, []);
    this._results.push(doc.value);

    // ast does not child, so only comment.
    if (ast.program.body.length === 0 && ast.program.innerComments) {
      const results = this._traverseComments(ast, null, ast.program.innerComments);
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
    const pseudoExportNodes = [];

    for (const exportNode of this._ast.program.body) {
      if (exportNode.type !== 'ExportDefaultDeclaration') continue;

      let targetClassName = null;
      let targetVariableName = null;
      let pseudoClassExport;

      switch (exportNode.declaration.type) {
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
        case 'Identifier': {
          const varNode = ASTUtil.findVariableDeclarationAndNewExpressionNode(exportNode.declaration.name, this._ast);
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
        }
        default:
          logger.w(`unknown export declaration type. type = "${exportNode.declaration.type}"`);
          break;
      }

      const classNode = ASTUtil.findClassDeclarationNode(targetClassName, this._ast);
      if (classNode) {
        const pseudoExportNode1 = this._copy(exportNode);
        pseudoExportNode1.declaration = this._copy(classNode);
        pseudoExportNode1.leadingComments = null;
        pseudoExportNode1.declaration.__PseudoExport__ = pseudoClassExport;
        pseudoExportNodes.push(pseudoExportNode1);

        if (targetVariableName) {
          const pseudoExportNode2 = this._copy(exportNode);
          pseudoExportNode2.declaration = ASTUtil.createVariableDeclarationAndNewExpressionNode(targetVariableName, targetClassName, exportNode.loc);
          pseudoExportNodes.push(pseudoExportNode2);
        }

        ASTUtil.sanitize(classNode);
        ASTUtil.sanitize(exportNode);
      }

      const functionNode = ASTUtil.findFunctionDeclarationNode(exportNode.declaration.name, this._ast);
      if (functionNode) {
        const pseudoExportNode = this._copy(exportNode);
        pseudoExportNode.declaration = this._copy(functionNode);
        ASTUtil.sanitize(exportNode);
        ASTUtil.sanitize(functionNode);
        pseudoExportNodes.push(pseudoExportNode);
      }

      const variableNode = ASTUtil.findVariableDeclarationNode(exportNode.declaration.name, this._ast);
      if (variableNode) {
        const pseudoExportNode = this._copy(exportNode);
        pseudoExportNode.declaration = this._copy(variableNode);
        ASTUtil.sanitize(exportNode);
        ASTUtil.sanitize(variableNode);
        pseudoExportNodes.push(pseudoExportNode);
      }
    }

    this._ast.program.body.push(...pseudoExportNodes);
  }

  /* eslint-disable max-statements */
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
    const pseudoExportNodes = [];

    for (const exportNode of this._ast.program.body) {
      if (exportNode.type !== 'ExportNamedDeclaration') continue;

      if (exportNode.declaration && exportNode.declaration.type === 'VariableDeclaration') {
        for (const declaration of exportNode.declaration.declarations) {
          if (!declaration.init || declaration.init.type !== 'NewExpression') continue;

          const classNode = ASTUtil.findClassDeclarationNode(declaration.init.callee.name, this._ast);
          if (classNode) {
            const pseudoExportNode = this._copy(exportNode);
            pseudoExportNode.declaration = this._copy(classNode);
            pseudoExportNode.leadingComments = null;
            pseudoExportNodes.push(pseudoExportNode);
            pseudoExportNode.declaration.__PseudoExport__ = true;
            ASTUtil.sanitize(classNode);
          }
        }
        continue;
      }

      for (const specifier of exportNode.specifiers) {
        if (specifier.type !== 'ExportSpecifier') continue;

        let targetClassName = null;
        let pseudoClassExport;

        const varNode = ASTUtil.findVariableDeclarationAndNewExpressionNode(specifier.exported.name, this._ast);
        if (varNode) {
          targetClassName = varNode.declarations[0].init.callee.name;
          pseudoClassExport = true;

          const pseudoExportNode = this._copy(exportNode);
          pseudoExportNode.declaration = this._copy(varNode);
          pseudoExportNode.specifiers = null;
          pseudoExportNodes.push(pseudoExportNode);

          ASTUtil.sanitize(varNode);
        } else {
          targetClassName = specifier.exported.name;
          pseudoClassExport = false;
        }

        const classNode = ASTUtil.findClassDeclarationNode(targetClassName, this._ast);
        if (classNode) {
          const pseudoExportNode = this._copy(exportNode);
          pseudoExportNode.declaration = this._copy(classNode);
          pseudoExportNode.leadingComments = null;
          pseudoExportNode.specifiers = null;
          pseudoExportNode.declaration.__PseudoExport__ = pseudoClassExport;
          pseudoExportNodes.push(pseudoExportNode);
          ASTUtil.sanitize(classNode);
        }

        const functionNode = ASTUtil.findFunctionDeclarationNode(specifier.exported.name, this._ast);
        if (functionNode) {
          const pseudoExportNode = this._copy(exportNode);
          pseudoExportNode.declaration = this._copy(functionNode);
          pseudoExportNode.leadingComments = null;
          pseudoExportNode.specifiers = null;
          ASTUtil.sanitize(functionNode);
          pseudoExportNodes.push(pseudoExportNode);
        }

        const variableNode = ASTUtil.findVariableDeclarationNode(specifier.exported.name, this._ast);
        if (variableNode) {
          const pseudoExportNode = this._copy(exportNode);
          pseudoExportNode.declaration = this._copy(variableNode);
          pseudoExportNode.leadingComments = null;
          pseudoExportNode.specifiers = null;
          ASTUtil.sanitize(variableNode);
          pseudoExportNodes.push(pseudoExportNode);
        }
      }
    }

    this._ast.program.body.push(...pseudoExportNodes);
  }

  /**
   * push node, and factory processes node.
   * @param {ASTNode} node - target node.
   * @param {ASTNode} parentNode - parent node of target node.
   */
  push(node, parentNode) {
    if (node === this._ast) return;

    if (node[already]) return;

    const isLastNodeInParent = this._isLastNodeInParent(node, parentNode);

    node[already] = true;
    Reflect.defineProperty(node, 'parent', {value: parentNode});

    // unwrap export declaration
    if (['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(node.type)) {
      parentNode = node;
      node = this._unwrapExportDeclaration(node);
      if (!node) return;
      node[already] = true;
      Reflect.defineProperty(node, 'parent', {value: parentNode});
    }

    // if node has decorators, leading comments is attached to decorators.
    if (node.decorators && node.decorators[0].leadingComments) {
      if (!node.leadingComments || !node.leadingComments.length) {
        node.leadingComments = node.decorators[0].leadingComments;
      }
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
      const virtualNode = {};
      Reflect.defineProperty(virtualNode, 'parent', {value: parentNode});
      node = virtualNode;
    }

    if (comments && comments.length) {
      const temp = [];
      for (const comment of comments) {
        if (CommentParser.isESDoc(comment)) temp.push(comment);
      }
      comments = temp;
    } else {
      comments = [];
    }

    if (comments.length === 0) {
      comments = [{type: 'CommentBlock', value: '* @_undocument'}];
    }

    const results = [];
    const lastComment = comments[comments.length - 1];
    for (const comment of comments) {
      const tags = CommentParser.parse(comment);

      let doc;
      if (comment === lastComment) {
        doc = this._createDoc(node, tags);
      } else {
        const virtualNode = {};
        Reflect.defineProperty(virtualNode, 'parent', {value: parentNode});
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
    const result = this._decideType(tags, node);
    const type = result.type;
    node = result.node;

    if (!type) return null;

    if (type === 'Class') {
      this._processedClassNodes.push(node);
    }

    let Clazz;
    /* eslint-disable max-statements-per-line */
    switch (type) {
      case 'Class': Clazz = ClassDoc; break;
      case 'Method': Clazz = MethodDoc; break;
      case 'ClassProperty': Clazz = ClassProperty; break;
      case 'Member': Clazz = MemberDoc; break;
      case 'Function': Clazz = FunctionDoc; break;
      case 'Variable': Clazz = VariableDoc; break;
      case 'Assignment': Clazz = AssignmentDoc; break;
      case 'Typedef': Clazz = TypedefDoc; break;
      case 'External': Clazz = ExternalDoc; break;
      default:
        throw new Error(`unexpected type: ${type}`);
    }

    if (!Clazz) return null;
    if (!node.type) node.type = type;

    return new Clazz(this._ast, node, this._pathResolver, tags);
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
    for (const tag of tags) {
      const tagName = tag.tagName;
      /* eslint-disable default-case */
      switch (tagName) {
        case '@typedef': type = 'Typedef'; break;
        case '@external': type = 'External'; break;
      }
    }

    if (type) return {type, node};

    if (!node) return {type, node};

    /* eslint-disable default-case */
    switch (node.type) {
      case 'ClassDeclaration':
        return this._decideClassDeclarationType(node);
      case 'ClassMethod':
        return this._decideMethodDefinitionType(node);
      case 'ClassProperty':
        return this._decideClassPropertyType(node);
      case 'ExpressionStatement':
        return this._decideExpressionStatementType(node);
      case 'FunctionDeclaration':
        return this._decideFunctionDeclarationType(node);
      case 'FunctionExpression':
        return this._decideFunctionExpressionType(node);
      case 'VariableDeclaration':
        return this._decideVariableType(node);
      case 'AssignmentExpression':
        return this._decideAssignmentType(node);
      case 'ArrowFunctionExpression':
        return this._decideArrowFunctionExpressionType(node);
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
    if (!this._isTopDepthInBody(node, this._ast.program.body)) return {type: null, node: null};

    return {type: 'Class', node: node};
  }

  /**
   * decide Doc type from method definition node.
   * @param {ASTNode} node - target node that is method definition node.
   * @returns {{type: ?string, node: ?ASTNode}} decided type.
   * @private
   */
  _decideMethodDefinitionType(node) {
    const classNode = this._findUp(node, ['ClassDeclaration', 'ClassExpression']);
    if (this._processedClassNodes.includes(classNode)) {
      return {type: 'Method', node: node};
    } else {
      logger.w('this method is not in class', node);
      return {type: null, node: null};
    }
  }

  /**
   * decide Doc type from class property node.
   * @param {ASTNode} node - target node that is classs property node.
   * @returns {{type: ?string, node: ?ASTNode}} decided type.
   * @private
   */
  _decideClassPropertyType(node) {
    const classNode = this._findUp(node, ['ClassDeclaration', 'ClassExpression']);
    if (this._processedClassNodes.includes(classNode)) {
      return {type: 'ClassProperty', node: node};
    } else {
      logger.w('this class property is not in class', node);
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
    if (!this._isTopDepthInBody(node, this._ast.program.body)) return {type: null, node: null};

    return {type: 'Function', node: node};
  }

  /**
   * decide Doc type from function expression node.
   * babylon 6.11.2 judges`export default async function foo(){}` to be `FunctionExpression`.
   * I expect `FunctionDeclaration`. this behavior may be bug of babylon.
   * for now, workaround for it with this method.
   * @param {ASTNode} node - target node that is function expression node.
   * @returns {{type: string, node: ASTNode}} decided type.
   * @private
   * @todo inspect with newer babylon.
   */
  _decideFunctionExpressionType(node) {
    if (!node.async) return {type: null, node: null};
    if (!this._isTopDepthInBody(node, this._ast.program.body)) return {type: null, node: null};

    return {type: 'Function', node: node};
  }

  /**
   * decide Doc type from arrow function expression node.
   * @param {ASTNode} node - target node that is arrow function expression node.
   * @returns {{type: string, node: ASTNode}} decided type.
   * @private
   */
  _decideArrowFunctionExpressionType(node) {
    if (!this._isTopDepthInBody(node, this._ast.program.body)) return {type: null, node: null};

    return {type: 'Function', node: node};
  }

  /**
   * decide Doc type from expression statement node.
   * @param {ASTNode} node - target node that is expression statement node.
   * @returns {{type: ?string, node: ?ASTNode}} decided type.
   * @private
   */
  _decideExpressionStatementType(node) {
    const isTop = this._isTopDepthInBody(node, this._ast.program.body);
    Reflect.defineProperty(node.expression, 'parent', {value: node});
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
          const classNode = this._findUp(node, ['ClassExpression', 'ClassDeclaration']);
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

    /* eslint-disable prefer-const */
    innerNode = node.right;
    innerNode.id = this._copy(node.left.id || node.left.property);
    Reflect.defineProperty(innerNode, 'parent', {value: node});
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
    if (!this._isTopDepthInBody(node, this._ast.program.body)) return {type: null, node: null};

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
      case 'ArrowFunctionExpression':
        innerType = 'Function';
        break;
      default:
        return {type: 'Variable', node: node};
    }

    innerNode = node.declarations[0].init;
    innerNode.id = this._copy(node.declarations[0].id);
    Reflect.defineProperty(innerNode, 'parent', {value: node});
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
    if (!this._isTopDepthInBody(node, this._ast.program.body)) return {type: null, node: null};

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

    /* eslint-disable prefer-const */
    innerNode = node.right;
    innerNode.id = this._copy(node.left.id || node.left.property);
    Reflect.defineProperty(innerNode, 'parent', {value: node});
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

    const exportedASTNode = node.declaration;
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
      const lastNode = parentNode.body[parentNode.body.length - 1];
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

    const parentNode = node.parent;
    if (['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(parentNode.type)) {
      node = parentNode;
    }

    for (const _node of body) {
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
    while (parent) {
      if (types.includes(parent.type)) return parent;
      parent = parent.parent;
    }

    return null;
  }
}
