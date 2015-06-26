'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _colorLogger = require('color-logger');

var _colorLogger2 = _interopRequireDefault(_colorLogger);

var _ParserCommentParserJs = require('../Parser/CommentParser.js');

var _ParserCommentParserJs2 = _interopRequireDefault(_ParserCommentParserJs);

var _DocFileDocJs = require('../Doc/FileDoc.js');

var _DocFileDocJs2 = _interopRequireDefault(_DocFileDocJs);

var _DocClassDocJs = require('../Doc/ClassDoc.js');

var _DocClassDocJs2 = _interopRequireDefault(_DocClassDocJs);

var _DocMethodDocJs = require('../Doc/MethodDoc.js');

var _DocMethodDocJs2 = _interopRequireDefault(_DocMethodDocJs);

var _DocMemberDocJs = require('../Doc/MemberDoc.js');

var _DocMemberDocJs2 = _interopRequireDefault(_DocMemberDocJs);

var _DocFunctionDocJs = require('../Doc/FunctionDoc.js');

var _DocFunctionDocJs2 = _interopRequireDefault(_DocFunctionDocJs);

var _DocVariableDocJs = require('../Doc/VariableDoc.js');

var _DocVariableDocJs2 = _interopRequireDefault(_DocVariableDocJs);

var _DocAssignmentDocJs = require('../Doc/AssignmentDoc.js');

var _DocAssignmentDocJs2 = _interopRequireDefault(_DocAssignmentDocJs);

var _DocTypedefDocJs = require('../Doc/TypedefDoc.js');

var _DocTypedefDocJs2 = _interopRequireDefault(_DocTypedefDocJs);

var _DocExternalDocJs = require('../Doc/ExternalDoc.js');

var _DocExternalDocJs2 = _interopRequireDefault(_DocExternalDocJs);

var already = Symbol('already');
var logger = new _colorLogger2['default']('DocFactory');

/**
 * Doc factory class.
 *
 * @example
 * let factory = new DocFactory(ast, pathResolver);
 * factory.push(node, parentNode);
 * let results = factory.results;
 */

var DocFactory = (function () {

  /**
   * create instance.
   * @param {AST} ast - AST of source code.
   * @param {PathResolver} pathResolver - path resolver of source code.
   */

  function DocFactory(ast, pathResolver) {
    _classCallCheck(this, DocFactory);

    this._ast = ast;
    this._pathResolver = pathResolver;
    this._results = [];
    this._processedClassNodes = [];

    this._joinSeparatedExport();

    // file doc
    var doc = new _DocFileDocJs2['default'](ast, ast, pathResolver, []);
    this._results.push(doc.value);

    // ast does not child, so only comment.
    if (ast.body.length === 0 && ast.leadingComments) {
      var _results;

      var results = this._traverseComments(ast, null, ast.leadingComments);
      (_results = this._results).push.apply(_results, _toConsumableArray(results));
    }
  }

  _createClass(DocFactory, [{
    key: '_joinSeparatedExport',

    /**
     * join separated export declaration in AST internal.
     *
     * ```javascript
     * class Foo {}
     *
     * export default Foo;
     * ```
     * ↓
     * ```javascript
     * export default class Foo {}
     * ```
     *
     * @private
     */
    value: function _joinSeparatedExport() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._ast.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node1 = _step.value;

          if (!['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(node1.type)) continue;

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this._ast.body[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var node2 = _step2.value;

              if (!node2.id) continue;
              if (node2.id.type !== 'Identifier') continue;
              if (node2.id.name !== node1.declaration.name) continue;

              node1.declaration = this._copy(node2);
              node2.type = 'Identifier'; // to ignore node2
              break;
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'push',

    /**
     * push node, and factory processes node.
     * @param {ASTNode} node - target node.
     * @param {ASTNode} parentNode - parent node of target node.
     */
    value: function push(node, parentNode) {
      var _results2;

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

      var results = this._traverseComments(parentNode, node, node.leadingComments);
      (_results2 = this._results).push.apply(_results2, _toConsumableArray(results));

      // for trailing comments.
      // traverse with only last node, because prevent duplication of trailing comments.
      if (node.trailingComments && isLastNodeInParent) {
        var _results4;

        var _results3 = this._traverseComments(parentNode, null, node.trailingComments);
        (_results4 = this._results).push.apply(_results4, _toConsumableArray(_results3));
      }
    }
  }, {
    key: '_traverseComments',

    /**
     * traverse comments of node, and create doc object.
     * @param {ASTNode} parentNode - parent of target node.
     * @param {ASTNode} node - target node.
     * @param {ASTNode[]} comments - comment nodes.
     * @returns {DocObject[]} created doc objects.
     * @private
     */
    value: function _traverseComments(parentNode, node, comments) {
      if (!node) {
        var virtualNode = {};
        Object.defineProperty(virtualNode, 'parent', { value: parentNode });
        node = virtualNode;
      }

      // hack: leadingComment of MethodDefinition with Literal is not valid by espree(v2.0.2)
      if (node.type === 'MethodDefinition' && node.key.type === 'Literal') {
        var line = node.loc.start.line - 1;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (this._ast.comments || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var comment = _step3.value;

            if (comment.loc.end.line === line) {
              comments = [comment];
              break;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      if (comments && comments.length) {
        var temp = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = comments[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var comment = _step4.value;

            if (_ParserCommentParserJs2['default'].isESDoc(comment)) temp.push(comment);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4['return']) {
              _iterator4['return']();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        comments = temp;
      } else {
        comments = [];
      }

      if (comments.length === 0) {
        comments = [{ type: 'Block', value: '* @undocument' }];
      }

      var results = [];
      var lastComment = comments[comments.length - 1];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = comments[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var comment = _step5.value;

          var tags = _ParserCommentParserJs2['default'].parse(comment);

          var doc = undefined;
          if (comment === lastComment) {
            doc = this._createDoc(node, tags);
          } else {
            var virtualNode = {};
            Object.defineProperty(virtualNode, 'parent', { value: parentNode });
            doc = this._createDoc(virtualNode, tags);
          }

          if (doc) results.push(doc.value);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5['return']) {
            _iterator5['return']();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return results;
    }
  }, {
    key: '_createDoc',

    /**
     * create Doc.
     * @param {ASTNode} node - target node.
     * @param {Tag[]} tags - tags of target node.
     * @returns {AbstractDoc} created Doc.
     * @private
     */
    value: function _createDoc(node, tags) {
      var result = this._decideType(tags, node);
      var type = result.type;
      node = result.node;

      if (!type) return null;

      if (type === 'Class') {
        this._processedClassNodes.push(node);
      }

      var clazz = undefined;
      switch (type) {
        case 'Class':
          clazz = _DocClassDocJs2['default'];break;
        case 'Method':
          clazz = _DocMethodDocJs2['default'];break;
        case 'Member':
          clazz = _DocMemberDocJs2['default'];break;
        case 'Function':
          clazz = _DocFunctionDocJs2['default'];break;
        case 'Variable':
          clazz = _DocVariableDocJs2['default'];break;
        case 'Assignment':
          clazz = _DocAssignmentDocJs2['default'];break;
        case 'Typedef':
          clazz = _DocTypedefDocJs2['default'];break;
        case 'External':
          clazz = _DocExternalDocJs2['default'];break;
      }

      if (!clazz) return;
      if (!node.type) node.type = type;

      return new clazz(this._ast, node, this._pathResolver, tags);
    }
  }, {
    key: '_decideType',

    /**
     * decide Doc type by using tags and node.
     * @param {Tag[]} tags - tags of node.
     * @param {ASTNode} node - target node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */
    value: function _decideType(tags, node) {
      var type = null;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = tags[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var tag = _step6.value;

          var tagName = tag.tagName;
          switch (tagName) {
            case '@class':
              type = 'Class';break;
            case '@member':
              type = 'Member';break;
            case '@method':
              type = 'Method';break;
            case '@function':
              type = 'Function';break;
            case '@var':
              type = 'Variable';break;
            case '@typedef':
              type = 'Typedef';break;
            case '@external':
              type = 'External';break;
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6['return']) {
            _iterator6['return']();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      if (type) return { type: type, node: node };

      if (!node) return { type: type, node: node };

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

      return { type: null, node: null };
    }
  }, {
    key: '_decideClassDeclarationType',

    /**
     * decide Doc type from class declaration node.
     * @param {ASTNode} node - target node that is class declaration node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */
    value: function _decideClassDeclarationType(node) {
      if (!this._isTopDepthInBody(node, this._ast.body)) return { type: null, node: null };

      return { type: 'Class', node: node };
    }
  }, {
    key: '_decideMethodDefinitionType',

    /**
     * decide Doc type from method definition node.
     * @param {ASTNode} node - target node that is method definition node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */
    value: function _decideMethodDefinitionType(node) {
      var classNode = this._findUp(node, ['ClassDeclaration', 'ClassExpression']);
      if (this._processedClassNodes.includes(classNode)) {
        return { type: 'Method', node: node };
      } else {
        logger.w('this method is not in class', node);
        return { type: null, node: null };
      }
    }
  }, {
    key: '_decideFunctionDeclarationType',

    /**
     * decide Doc type from function declaration node.
     * @param {ASTNode} node - target node that is function declaration node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */
    value: function _decideFunctionDeclarationType(node) {
      if (!this._isTopDepthInBody(node, this._ast.body)) return { type: null, node: null };

      return { type: 'Function', node: node };
    }
  }, {
    key: '_decideExpressionStatementType',

    /**
     * decide Doc type from expression statement node.
     * @param {ASTNode} node - target node that is expression statement node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */
    value: function _decideExpressionStatementType(node) {
      var isTop = this._isTopDepthInBody(node, this._ast.body);
      Object.defineProperty(node.expression, 'parent', { value: node });
      node = node.expression;
      node[already] = true;

      var innerType = undefined;
      var innerNode = undefined;

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
            var classNode = this._findUp(node, ['ClassExpression', 'ClassDeclaration']);
            if (!this._processedClassNodes.includes(classNode)) {
              logger.w('this member is not in class.', this._pathResolver.filePath, node);
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
  }, {
    key: '_decideVariableType',

    /**
     * decide Doc type from variable node.
     * @param {ASTNode} node - target node that is variable node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */
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
  }, {
    key: '_decideAssignmentType',

    /**
     * decide Doc type from assignment node.
     * @param {ASTNode} node - target node that is assignment node.
     * @returns {{type: string, node: ASTNode}} decided type.
     * @private
     */
    value: function _decideAssignmentType(node) {
      if (!this._isTopDepthInBody(node, this._ast.body)) return { type: null, node: null };

      var innerType = undefined;
      var innerNode = undefined;

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
  }, {
    key: '_unwrapExportDeclaration',

    /**
     * unwrap exported node.
     * @param {ASTNode} node - target node that is export declaration node.
     * @returns {ASTNode|null} unwrapped child node of exported node.
     * @private
     */
    value: function _unwrapExportDeclaration(node) {
      var _exportedASTNode$leadingComments, _exportedASTNode$trailingComments;

      // e.g. `export A from './A.js'` has not declaration
      if (!node.declaration) return null;

      var exportedASTNode = node.declaration;
      if (!exportedASTNode.leadingComments) exportedASTNode.leadingComments = [];
      (_exportedASTNode$leadingComments = exportedASTNode.leadingComments).push.apply(_exportedASTNode$leadingComments, _toConsumableArray(node.leadingComments || []));

      if (!exportedASTNode.trailingComments) exportedASTNode.trailingComments = [];
      (_exportedASTNode$trailingComments = exportedASTNode.trailingComments).push.apply(_exportedASTNode$trailingComments, _toConsumableArray(node.trailingComments || []));

      return exportedASTNode;
    }
  }, {
    key: '_isLastNodeInParent',

    /**
     * judge node is last in parent.
     * @param {ASTNode} node - target node.
     * @param {ASTNode} parentNode - target parent node.
     * @returns {boolean} if true, the node is last in parent.
     * @private
     */
    value: function _isLastNodeInParent(node, parentNode) {
      if (parentNode && parentNode.body) {
        var lastNode = parentNode.body[parentNode.body.length - 1];
        return node === lastNode;
      }

      return false;
    }
  }, {
    key: '_isTopDepthInBody',

    /**
     * judge node is top in body.
     * @param {ASTNode} node - target node.
     * @param {ASTNode[]} body - target body node.
     * @returns {boolean} if true, the node is top in body.
     * @private
     */
    value: function _isTopDepthInBody(node, body) {
      if (!body) return false;
      if (!Array.isArray(body)) return false;

      var parentNode = node.parent;
      if (['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(parentNode.type)) {
        node = parentNode;
      }

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = body[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _node = _step7.value;

          if (node === _node) return true;
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7['return']) {
            _iterator7['return']();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return false;
    }
  }, {
    key: '_copy',

    /**
     * deep copy object.
     * @param {Object} obj - target object.
     * @return {Object} copied object.
     * @private
     */
    value: function _copy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  }, {
    key: '_findUp',

    /**
     * find node while goes up.
     * @param {ASTNode} node - start node.
     * @param {string[]} types - ASTNode types.
     * @returns {ASTNode|null} found first node.
     * @private
     */
    value: function _findUp(node, types) {
      var parent = node.parent;
      while (parent) {
        if (types.includes(parent.type)) return parent;
        parent = parent.parent;
      }

      return null;
    }
  }, {
    key: 'results',

    /**
     * @type {DocObject[]}
     */
    get: function get() {
      return [].concat(_toConsumableArray(this._results));
    }
  }]);

  return DocFactory;
})();

exports['default'] = DocFactory;
module.exports = exports['default'];