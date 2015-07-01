'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _estraverse = require('estraverse');

var _estraverse2 = _interopRequireDefault(_estraverse);

var ESTRAVERSE_KEYS = {
  Super: [],
  JSXElement: []
};

/**
 * Utility for AST.
 */

var ASTUtil = (function () {
  function ASTUtil() {
    _classCallCheck(this, ASTUtil);
  }

  _createClass(ASTUtil, null, [{
    key: 'traverse',

    /**
     * traverse ast nodes.
     * @param {AST} ast - target AST.
     * @param {function(node: Object, parent: Object)} callback - this is called with each node.
     */
    value: function traverse(ast, callback) {
      _estraverse2['default'].traverse(ast, {
        enter: function enter(node, parent) {
          callback.call(this, node, parent);
        },

        keys: ESTRAVERSE_KEYS
      });
    }
  }, {
    key: 'findPathInImportDeclaration',

    /**
     * find file path in import declaration by name.
     * e.g. can find ``./foo/bar.js`` from ``import Bar from './foo/bar.js'`` by ``Bar``.
     * @param {AST} ast - target AST.
     * @param {string} name - identifier name.
     * @returns {string|null} file path.
     */
    value: function findPathInImportDeclaration(ast, name) {
      var path = null;

      _estraverse2['default'].traverse(ast, {
        enter: function enter(node, parent) {
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
                this['break']();
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
        },

        keys: ESTRAVERSE_KEYS
      });

      return path;
    }
  }]);

  return ASTUtil;
})();

exports['default'] = ASTUtil;
module.exports = exports['default'];