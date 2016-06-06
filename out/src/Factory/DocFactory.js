'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colorLogger = require('color-logger');

var _colorLogger2 = _interopRequireDefault(_colorLogger);

var _CommentParser = require('../Parser/CommentParser.js');

var _CommentParser2 = _interopRequireDefault(_CommentParser);

var _ParamParser = require('../Parser/ParamParser.js');

var _ParamParser2 = _interopRequireDefault(_ParamParser);

var _FileDoc = require('../Doc/FileDoc.js');

var _FileDoc2 = _interopRequireDefault(_FileDoc);

var _ClassDoc = require('../Doc/ClassDoc.js');

var _ClassDoc2 = _interopRequireDefault(_ClassDoc);

var _MethodDoc = require('../Doc/MethodDoc.js');

var _MethodDoc2 = _interopRequireDefault(_MethodDoc);

var _MemberDoc = require('../Doc/MemberDoc.js');

var _MemberDoc2 = _interopRequireDefault(_MemberDoc);

var _FunctionDoc = require('../Doc/FunctionDoc.js');

var _FunctionDoc2 = _interopRequireDefault(_FunctionDoc);

var _VariableDoc = require('../Doc/VariableDoc.js');

var _VariableDoc2 = _interopRequireDefault(_VariableDoc);

var _AssignmentDoc = require('../Doc/AssignmentDoc.js');

var _AssignmentDoc2 = _interopRequireDefault(_AssignmentDoc);

var _TypedefDoc = require('../Doc/TypedefDoc.js');

var _TypedefDoc2 = _interopRequireDefault(_TypedefDoc);

var _ExternalDoc = require('../Doc/ExternalDoc.js');

var _ExternalDoc2 = _interopRequireDefault(_ExternalDoc);

var _ASTUtil = require('../Util/ASTUtil.js');

var _ASTUtil2 = _interopRequireDefault(_ASTUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var already = Symbol('already');

/**
 * Doc factory class.
 *
 * @example
 * let factory = new DocFactory(ast, pathResolver);
 * factory.push(node, parentNode);
 * let results = factory.results;
 */

var DocFactory = function () {
  _createClass(DocFactory, [{
    key: 'results',

    /**
     * @type {DocObject[]}
     */
    get: function get() {
      return [].concat(_toConsumableArray(this._results));
    }

    /**
     * create instance.
     * @param {AST} ast - AST of source code.
     * @param {PathResolver} pathResolver - path resolver of source code.
     */

  }]);

  function DocFactory(ast, pathResolver) {
    _classCallCheck(this, DocFactory);

    this._ast = Array.isArray(ast.body) ? ast : ast.program;
    this._pathResolver = pathResolver;
    this._results = [];
    this._processedClassNodes = [];

    this._inspectExportDefaultDeclaration();
    this._inspectExportNamedDeclaration();

    // file doc
    var doc = new _FileDoc2.default(this._ast, this._ast, pathResolver, []);
    this._results.push(doc.value);

    // ast does not child, so only comment.
    if (this._ast.body.length === 0) {
      if (this._ast.leadingComments) {
        var _results;

        var results = this._traverseComments(this._ast, null, this._ast.leadingComments);
        (_results = this._results).push.apply(_results, _toConsumableArray(results));
      }

      if (this._ast.trailingComments) {
        var _results3;

        var _results2 = this._traverseComments(this._ast, null, this._ast.trailingComments);
        (_results3 = this._results).push.apply(_results3, _toConsumableArray(_results2));
      }

      if (this._ast.innerComments) {
        var _results5;

        var _results4 = this._traverseComments(this._ast, null, this._ast.innerComments);
        (_results5 = this._results).push.apply(_results5, _toConsumableArray(_results4));
      }
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


  _createClass(DocFactory, [{
    key: '_inspectExportDefaultDeclaration',
    value: function _inspectExportDefaultDeclaration() {
      var _ast$body;

      var pseudoExportNodes = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._ast.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var exportNode = _step.value;

          if (exportNode.type !== 'ExportDefaultDeclaration') continue;

          var targetClassName = null;
          var targetVariableName = null;
          var pseudoClassExport = void 0;

          switch (exportNode.declaration.type) {
            case 'NewExpression':
              if (exportNode.declaration.callee.type === 'Identifier') {
                targetClassName = exportNode.declaration.callee.name;
              } else if (exportNode.declaration.callee.type === 'MemberExpression') {
                targetClassName = exportNode.declaration.callee.property.name;
              } else {
                targetClassName = '';
              }
              targetVariableName = targetClassName.replace(/^./, function (c) {
                return c.toLowerCase();
              });
              pseudoClassExport = true;
              break;
            case 'Identifier':
              var varNode = _ASTUtil2.default.findVariableDeclarationAndNewExpressionNode(exportNode.declaration.name, this._ast);
              if (varNode) {
                targetClassName = varNode.declarations[0].init.callee.name;
                targetVariableName = exportNode.declaration.name;
                pseudoClassExport = true;
                _ASTUtil2.default.sanitize(varNode);
              } else {
                targetClassName = exportNode.declaration.name;
                pseudoClassExport = false;
              }
              break;
            default:
              _colorLogger2.default.w('unknown export declaration type. type = "' + exportNode.declaration.type + '"');
              break;
          }

          var classNode = _ASTUtil2.default.findClassDeclarationNode(targetClassName, this._ast);
          if (classNode) {
            var pseudoExportNode1 = this._copy(exportNode);
            pseudoExportNode1.declaration = this._copy(classNode);
            pseudoExportNode1.leadingComments = null;
            pseudoExportNode1.declaration.__esdoc__pseudo_export = pseudoClassExport;
            pseudoExportNodes.push(pseudoExportNode1);

            if (targetVariableName) {
              var pseudoExportNode2 = this._copy(exportNode);
              pseudoExportNode2.declaration = _ASTUtil2.default.createVariableDeclarationAndNewExpressionNode(targetVariableName, targetClassName, exportNode.loc);
              pseudoExportNodes.push(pseudoExportNode2);
            }

            _ASTUtil2.default.sanitize(classNode);
            _ASTUtil2.default.sanitize(exportNode);
          }

          var functionNode = _ASTUtil2.default.findFunctionDeclarationNode(exportNode.declaration.name, this._ast);
          if (functionNode) {
            var pseudoExportNode = this._copy(exportNode);
            pseudoExportNode.declaration = this._copy(functionNode);
            _ASTUtil2.default.sanitize(exportNode);
            _ASTUtil2.default.sanitize(functionNode);
            pseudoExportNodes.push(pseudoExportNode);
          }

          var variableNode = _ASTUtil2.default.findVariableDeclarationNode(exportNode.declaration.name, this._ast);
          if (variableNode) {
            var _pseudoExportNode = this._copy(exportNode);
            _pseudoExportNode.declaration = this._copy(variableNode);
            _ASTUtil2.default.sanitize(exportNode);
            _ASTUtil2.default.sanitize(variableNode);
            pseudoExportNodes.push(_pseudoExportNode);
          }
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

      (_ast$body = this._ast.body).push.apply(_ast$body, pseudoExportNodes);
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

  }, {
    key: '_inspectExportNamedDeclaration',
    value: function _inspectExportNamedDeclaration() {
      var _ast$body2;

      var pseudoExportNodes = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._ast.body[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var exportNode = _step2.value;

          if (exportNode.type !== 'ExportNamedDeclaration') continue;

          if (exportNode.declaration && exportNode.declaration.type === 'VariableDeclaration') {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = exportNode.declaration.declarations[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var declaration = _step3.value;

                if (!declaration.init || declaration.init.type !== 'NewExpression') continue;

                var classNode = _ASTUtil2.default.findClassDeclarationNode(declaration.init.callee.name, this._ast);
                if (classNode) {
                  var pseudoExportNode = this._copy(exportNode);
                  pseudoExportNode.declaration = this._copy(classNode);
                  pseudoExportNode.leadingComments = null;
                  pseudoExportNodes.push(pseudoExportNode);
                  pseudoExportNode.declaration.__esdoc__pseudo_export = true;
                  _ASTUtil2.default.sanitize(classNode);
                }
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

            continue;
          }

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = exportNode.specifiers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var specifier = _step4.value;

              if (specifier.type !== 'ExportSpecifier') continue;

              var targetClassName = null;
              var pseudoClassExport = void 0;

              var varNode = _ASTUtil2.default.findVariableDeclarationAndNewExpressionNode(specifier.exported.name, this._ast);
              if (varNode) {
                targetClassName = varNode.declarations[0].init.callee.name;
                pseudoClassExport = true;

                var _pseudoExportNode2 = this._copy(exportNode);
                _pseudoExportNode2.declaration = this._copy(varNode);
                _pseudoExportNode2.specifiers = null;
                pseudoExportNodes.push(_pseudoExportNode2);

                _ASTUtil2.default.sanitize(varNode);
              } else {
                targetClassName = specifier.exported.name;
                pseudoClassExport = false;
              }

              var _classNode = _ASTUtil2.default.findClassDeclarationNode(targetClassName, this._ast);
              if (_classNode) {
                var _pseudoExportNode3 = this._copy(exportNode);
                _pseudoExportNode3.declaration = this._copy(_classNode);
                _pseudoExportNode3.leadingComments = null;
                _pseudoExportNode3.specifiers = null;
                _pseudoExportNode3.declaration.__esdoc__pseudo_export = pseudoClassExport;
                pseudoExportNodes.push(_pseudoExportNode3);
                _ASTUtil2.default.sanitize(_classNode);
              }

              var functionNode = _ASTUtil2.default.findFunctionDeclarationNode(specifier.exported.name, this._ast);
              if (functionNode) {
                var _pseudoExportNode4 = this._copy(exportNode);
                _pseudoExportNode4.declaration = this._copy(functionNode);
                _pseudoExportNode4.leadingComments = null;
                _pseudoExportNode4.specifiers = null;
                _ASTUtil2.default.sanitize(functionNode);
                pseudoExportNodes.push(_pseudoExportNode4);
              }

              var variableNode = _ASTUtil2.default.findVariableDeclarationNode(specifier.exported.name, this._ast);
              if (variableNode) {
                var _pseudoExportNode5 = this._copy(exportNode);
                _pseudoExportNode5.declaration = this._copy(variableNode);
                _pseudoExportNode5.leadingComments = null;
                _pseudoExportNode5.specifiers = null;
                _ASTUtil2.default.sanitize(variableNode);
                pseudoExportNodes.push(_pseudoExportNode5);
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
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

      (_ast$body2 = this._ast.body).push.apply(_ast$body2, pseudoExportNodes);
    }

    /**
     * push node, and factory processes node.
     * @param {ASTNode} node - target node.
     * @param {ASTNode} parentNode - parent node of target node.
     */

  }, {
    key: 'push',
    value: function push(node, parentNode) {
      var _results6;

      if (node === this._ast) return;
      if (node[already]) return;

      var isLastNodeInParent = this._isLastNodeInParent(node, parentNode);

      node[already] = true;
      Object.defineProperty(node, 'parent', { value: parentNode });

      // unwrap export declaration
      if (['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(node.type)) {
        parentNode = node;
        node = this._unwrapExportDeclaration(node);
        if (!node) return;
        node[already] = true;
        Object.defineProperty(node, 'parent', { value: parentNode });
      }

      var results = void 0;
      results = this._traverseComments(parentNode, node, node.leadingComments);
      (_results6 = this._results).push.apply(_results6, _toConsumableArray(results));

      // for trailing comments.
      // traverse with only last node, because prevent duplication of trailing comments.
      if (node.trailingComments && isLastNodeInParent) {
        var _results7;

        results = this._traverseComments(parentNode, null, node.trailingComments);
        (_results7 = this._results).push.apply(_results7, _toConsumableArray(results));
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

  }, {
    key: '_traverseComments',
    value: function _traverseComments(parentNode, node, comments) {
      if (!node) {
        var virtualNode = {};
        Object.defineProperty(virtualNode, 'parent', { value: parentNode });
        node = virtualNode;
      }

      // hack: leadingComment of MethodDefinition with Literal is not valid by espree(v2.0.2)
      //if (node.type === 'MethodDefinition' && node.key.type === 'Literal') {
      // todo: switch espree to acorn
      //TODO REMOVE    if (node.type === 'ClassMethod' && (node.computed || !node.key.name)) {
      if (node.type === 'ClassMethod' && _ParamParser2.default.isLiteral(node.key.type)) {
        var line = node.loc.start.line - 1;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = (this._ast.comments || [])[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var comment = _step5.value;

            if (comment.loc.end.line === line) {
              comments = [comment];
              break;
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }

      if (comments && comments.length) {
        var temp = [];
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = comments[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _comment = _step6.value;

            if (_CommentParser2.default.isESDoc(_comment)) temp.push(_comment);
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        comments = temp;
      } else {
        comments = [];
      }

      if (comments.length === 0) {
        comments = [{ type: 'CommentBlock', value: '* @_undocument' }];
      }

      var results = [];
      var lastComment = comments[comments.length - 1];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = comments[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _comment2 = _step7.value;

          var tags = _CommentParser2.default.parse(_comment2);

          var doc = void 0;
          if (_comment2 === lastComment) {
            doc = this._createDoc(node, tags);
          } else {
            var _virtualNode = {};
            Object.defineProperty(_virtualNode, 'parent', { value: parentNode });
            doc = this._createDoc(_virtualNode, tags);
          }

          if (doc) results.push(doc.value);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
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

  }, {
    key: '_createDoc',
    value: function _createDoc(node, tags) {
      var result = this._decideType(tags, node);
      var type = result.type;
      node = result.node;

      if (!type) return null;

      if (type === 'Class') {
        this._processedClassNodes.push(node);
      }

      var clazz = void 0;
      switch (type) {
        case 'Class':
          clazz = _ClassDoc2.default;break;
        case 'Method':
          clazz = _MethodDoc2.default;break;
        case 'Member':
          clazz = _MemberDoc2.default;break;
        case 'Function':
          clazz = _FunctionDoc2.default;break;
        case 'Variable':
          clazz = _VariableDoc2.default;break;
        case 'Assignment':
          clazz = _AssignmentDoc2.default;break;
        case 'Typedef':
          clazz = _TypedefDoc2.default;break;
        case 'External':
          clazz = _ExternalDoc2.default;break;
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

  }, {
    key: '_decideType',
    value: function _decideType(tags, node) {
      var type = null;
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = tags[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var tag = _step8.value;

          var tagName = tag.tagName;
          switch (tagName) {
            case '@_class':
              type = 'Class';break;
            case '@_member':
              type = 'Member';break;
            case '@_method':
              type = 'Method';break;
            case '@_function':
              type = 'Function';break;
            case '@_var':
              type = 'Variable';break;
            case '@typedef':
              type = 'Typedef';break;
            case '@external':
              type = 'External';break;
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      if (type) return { type: type, node: node };

      if (!node) return { type: type, node: node };

      switch (node.type) {
        case 'ClassDeclaration':
          return this._decideClassDeclarationType(node);
        case 'ClassMethod':
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

      return { type: null, node: null };
    }

    /**
     * decide Doc type from class declaration node.
     * @param {ASTNode} node - target node that is class declaration node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */

  }, {
    key: '_decideClassDeclarationType',
    value: function _decideClassDeclarationType(node) {
      if (!this._isTopDepthInBody(node, this._ast.body)) return { type: null, node: null };

      return { type: 'Class', node: node };
    }

    /**
     * decide Doc type from method definition node.
     * @param {ASTNode} node - target node that is method definition node.
     * @returns {{type: ?string, node: ?ASTNode}} decided type.
     * @private
     */

  }, {
    key: '_decideMethodDefinitionType',
    value: function _decideMethodDefinitionType(node) {
      var classNode = this._findUp(node, ['ClassDeclaration', 'ClassExpression']);
      if (this._processedClassNodes.includes(classNode)) {
        return { type: 'Method', node: node };
      } else {
        _colorLogger2.default.w('this method is not in class', node);
        return { type: null, node: null };
      }
    }

    /**
     * decide Doc type from function declaration node.
     * @param {ASTNode} node - target node that is function declaration node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */

  }, {
    key: '_decideFunctionDeclarationType',
    value: function _decideFunctionDeclarationType(node) {
      if (!this._isTopDepthInBody(node, this._ast.body)) return { type: null, node: null };

      return { type: 'Function', node: node };
    }

    /**
     * decide Doc type from expression statement node.
     * @param {ASTNode} node - target node that is expression statement node.
     * @returns {{type: ?string, node: ?ASTNode}} decided type.
     * @private
     */

  }, {
    key: '_decideExpressionStatementType',
    value: function _decideExpressionStatementType(node) {
      var isTop = this._isTopDepthInBody(node, this._ast.body);
      Object.defineProperty(node.expression, 'parent', { value: node });
      node = node.expression;
      node[already] = true;

      var innerType = void 0;
      var innerNode = void 0;

      if (!node.right) return { type: null, node: null };

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
              return { type: null, node: null };
            }

            var classNode = this._findUp(node, ['ClassExpression', 'ClassDeclaration']);
            if (!this._processedClassNodes.includes(classNode)) {
              _colorLogger2.default.w('this member is not in class.', this._pathResolver.filePath, node);
              return { type: null, node: null };
            }

            return { type: 'Member', node: node };
          } else {
            return { type: null, node: null };
          }
      }

      if (!isTop) return { type: null, node: null };

      innerNode = node.right;
      innerNode.id = this._copy(node.left.id || node.left.property);
      Object.defineProperty(innerNode, 'parent', { value: node });
      innerNode[already] = true;

      return { type: innerType, node: innerNode };
    }

    /**
     * decide Doc type from variable node.
     * @param {ASTNode} node - target node that is variable node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */

  }, {
    key: '_decideVariableType',
    value: function _decideVariableType(node) {
      if (!this._isTopDepthInBody(node, this._ast.body)) return { type: null, node: null };

      var innerType = null;
      var innerNode = null;

      if (!node.declarations[0].init) return { type: innerType, node: innerNode };

      switch (node.declarations[0].init.type) {
        case 'FunctionExpression':
          innerType = 'Function';
          break;
        case 'ClassExpression':
          innerType = 'Class';
          break;
        default:
          return { type: 'Variable', node: node };
      }

      innerNode = node.declarations[0].init;
      innerNode.id = this._copy(node.declarations[0].id);
      Object.defineProperty(innerNode, 'parent', { value: node });
      innerNode[already] = true;

      return { type: innerType, node: innerNode };
    }

    /**
     * decide Doc type from assignment node.
     * @param {ASTNode} node - target node that is assignment node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */

  }, {
    key: '_decideAssignmentType',
    value: function _decideAssignmentType(node) {
      if (!this._isTopDepthInBody(node, this._ast.body)) return { type: null, node: null };

      var innerType = void 0;
      var innerNode = void 0;

      switch (node.right.type) {
        case 'FunctionExpression':
          innerType = 'Function';
          break;
        case 'ClassExpression':
          innerType = 'Class';
          break;
        default:
          return { type: 'Assignment', node: node };
      }

      innerNode = node.right;
      innerNode.id = this._copy(node.left.id || node.left.property);
      Object.defineProperty(innerNode, 'parent', { value: node });
      innerNode[already] = true;

      return { type: innerType, node: innerNode };
    }

    /**
     * unwrap exported node.
     * @param {ASTNode} node - target node that is export declaration node.
     * @returns {ASTNode|null} unwrapped child node of exported node.
     * @private
     */

  }, {
    key: '_unwrapExportDeclaration',
    value: function _unwrapExportDeclaration(node) {
      var _exportedASTNode$lead, _exportedASTNode$trai;

      // e.g. `export A from './A.js'` has not declaration
      if (!node.declaration) return null;

      var exportedASTNode = node.declaration;
      if (!exportedASTNode.leadingComments) exportedASTNode.leadingComments = [];
      (_exportedASTNode$lead = exportedASTNode.leadingComments).push.apply(_exportedASTNode$lead, _toConsumableArray(node.leadingComments || []));

      if (!exportedASTNode.trailingComments) exportedASTNode.trailingComments = [];
      (_exportedASTNode$trai = exportedASTNode.trailingComments).push.apply(_exportedASTNode$trai, _toConsumableArray(node.trailingComments || []));

      return exportedASTNode;
    }

    /**
     * judge node is last in parent.
     * @param {ASTNode} node - target node.
     * @param {ASTNode} parentNode - target parent node.
     * @returns {boolean} if true, the node is last in parent.
     * @private
     */

  }, {
    key: '_isLastNodeInParent',
    value: function _isLastNodeInParent(node, parentNode) {
      if (parentNode && parentNode.body) {
        var lastNode = parentNode.body[parentNode.body.length - 1];
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

  }, {
    key: '_isTopDepthInBody',
    value: function _isTopDepthInBody(node, body) {
      if (!body) return false;
      if (!Array.isArray(body)) return false;

      var parentNode = node.parent;
      if (['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(parentNode.type)) {
        node = parentNode;
      }

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = body[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _node = _step9.value;

          if (node === _node) return true;
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      return false;
    }

    /**
     * deep copy object.
     * @param {Object} obj - target object.
     * @return {Object} copied object.
     * @private
     */

  }, {
    key: '_copy',
    value: function _copy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

    /**
     * find node while goes up.
     * @param {ASTNode} node - start node.
     * @param {string[]} types - ASTNode types.
     * @returns {ASTNode|null} found first node.
     * @private
     */

  }, {
    key: '_findUp',
    value: function _findUp(node, types) {
      var parent = node.parent;
      while (parent) {
        if (types.includes(parent.type)) return parent;
        parent = parent.parent;
      }

      return null;
    }
  }]);

  return DocFactory;
}();

exports.default = DocFactory;
module.exports = exports['default'];