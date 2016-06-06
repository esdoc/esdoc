'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typhonjsAstWalker = require('typhonjs-ast-walker');

var _typhonjsAstWalker2 = _interopRequireDefault(_typhonjsAstWalker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Utility for AST.
 */

var ASTUtil = function () {
  function ASTUtil() {
    _classCallCheck(this, ASTUtil);
  }

  _createClass(ASTUtil, null, [{
    key: 'sanitize',

    /**
     * sanitize node.
     * change node type to `Identifier` and empty comment.
     * @param {ASTNode} node - target node.
     */
    value: function sanitize(node) {
      if (!node) return;
      node.type = 'Identifier';
      node.name = '_';
      node.leadingComments = [];
      node.trailingComments = [];
    }

    /**
     * traverse ast nodes.
     * @param {AST} ast - target AST.
     * @param {function(node: Object, parent: Object)} callback - this is called with each node.
     */

  }, {
    key: 'traverse',
    value: function traverse(ast, callback) {
      _typhonjsAstWalker2.default.traverse(ast, {
        enterNode: function enterNode(node, parent) {
          callback.call(this, node, parent);
        }
      });
    }

    /**
     * find file path in import declaration by name.
     * e.g. can find ``./foo/bar.js`` from ``import Bar from './foo/bar.js'`` by ``Bar``.
     * @param {AST} ast - target AST.
     * @param {string} name - identifier name.
     * @returns {string|null} file path.
     */

  }, {
    key: 'findPathInImportDeclaration',
    value: function findPathInImportDeclaration(ast, name) {
      var path = null;

      _typhonjsAstWalker2.default.traverse(ast, {
        enterNode: function enterNode(node) {
          if (node.type !== 'ImportDeclaration') return;

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = node.specifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var spec = _step.value;

              var localName = spec.local.name;
              if (localName === name) {
                path = node.source.value;
                return null; // Quit traversal
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
        }
      });

      return path;
    }

    /**
     * find VariableDeclaration node which has NewExpression.
     * @param {string} name - variable name.
     * @param {AST} ast - find in this ast.
     * @returns {ASTNode|null} found ast node.
     */

  }, {
    key: 'findVariableDeclarationAndNewExpressionNode',
    value: function findVariableDeclarationAndNewExpressionNode(name, ast) {
      if (!name) return null;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = ast.body[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var node = _step2.value;

          if (node.type === 'VariableDeclaration' && node.declarations[0].init && node.declarations[0].init.type === 'NewExpression' && node.declarations[0].id.name === name) {
            return node;
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

      return null;
    }

    /**
     * find ClassDeclaration node.
     * @param {string} name - class name.
     * @param {AST} ast - find in this ast.
     * @returns {ASTNode|null} found ast node.
     */

  }, {
    key: 'findClassDeclarationNode',
    value: function findClassDeclarationNode(name, ast) {
      if (!name) return null;

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = ast.body[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var node = _step3.value;

          if (node.type === 'ClassDeclaration' && node.id.name === name) return node;
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

      return null;
    }

    /**
     * find FunctionDeclaration node.
     * @param {string} name - function name.
     * @param {AST} ast - find in this ast.
     * @returns {ASTNode|null} found ast node.
     */

  }, {
    key: 'findFunctionDeclarationNode',
    value: function findFunctionDeclarationNode(name, ast) {
      if (!name) return null;

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = ast.body[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var node = _step4.value;

          if (node.type === 'FunctionDeclaration' && node.id.name === name) return node;
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

      return null;
    }

    /**
     * find VariableDeclaration node.
     * @param {string} name - variable name.
     * @param {AST} ast - find in this ast.
     * @returns {ASTNode|null} found ast node.
     */

  }, {
    key: 'findVariableDeclarationNode',
    value: function findVariableDeclarationNode(name, ast) {
      if (!name) return null;

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = ast.body[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var node = _step5.value;

          if (node.type === 'VariableDeclaration' && node.declarations[0].id.name === name) return node;
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

      return null;
    }

    /**
     * create VariableDeclaration node which has NewExpression.
     * @param {string} name - variable name.
     * @param {string} className - class name.
     * @param {Object} loc - location.
     * @returns {ASTNode} created node.
     */

  }, {
    key: 'createVariableDeclarationAndNewExpressionNode',
    value: function createVariableDeclarationAndNewExpressionNode(name, className, loc) {
      var node = {
        type: 'VariableDeclaration',
        kind: 'let',
        loc: loc,
        declarations: [{
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: name },
          init: { type: 'NewExpression', callee: { type: 'Identifier', name: className } }
        }]
      };

      return node;
    }
  }]);

  return ASTUtil;
}();

exports.default = ASTUtil;
module.exports = exports['default'];