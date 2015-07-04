import estraverse from 'estraverse';

let ESTRAVERSE_KEYS = {
  Super: [],
  JSXElement: []
};

/**
 * Utility for AST.
 */
export default class ASTUtil {
  /**
   * traverse ast nodes.
   * @param {AST} ast - target AST.
   * @param {function(node: Object, parent: Object)} callback - this is called with each node.
   */
  static traverse(ast, callback) {
    estraverse.traverse(ast, {
      enter: function(node, parent) {
        callback.call(this, node, parent);
      },

      keys: ESTRAVERSE_KEYS
    });
  }

  /**
   * find file path in import declaration by name.
   * e.g. can find ``./foo/bar.js`` from ``import Bar from './foo/bar.js'`` by ``Bar``.
   * @param {AST} ast - target AST.
   * @param {string} name - identifier name.
   * @returns {string|null} file path.
   */
  static findPathInImportDeclaration(ast, name) {
    let path = null;

    estraverse.traverse(ast, {
      enter: function(node, parent) {
        if (node.type !== 'ImportDeclaration') return;

        for (let spec of node.specifiers) {
          let localName = spec.local.name;
          if (localName === name) {
            path = node.source.value;
            this.break();
          }
        }
      },

      keys: ESTRAVERSE_KEYS
    });

    return path;
  }

  /**
   * find VariableDeclaration node which has NewExpression.
   * @param {string} name - variable name.
   * @param {AST} ast - find in this ast.
   * @returns {ASTNode|null} found ast node.
   */
  static findVariableDeclarationAndNewExpressionNode(name, ast) {
    for (let node of ast.body) {
      if (node.type === 'VariableDeclaration' &&
        node.declarations[0].init.type === 'NewExpression' &&
        node.declarations[0].id.name === name) {
        return node;
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
  static findClassDeclarationNode(name, ast) {
    for (let node of ast.body) {
      if (node.type === 'ClassDeclaration' && node.id.name === name) return node;
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
  static createVariableDeclarationAndNewExpressionNode(name, className, loc) {
    let node = {
      type: 'VariableDeclaration',
      kind: 'let',
      loc: loc,
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {type: 'Identifier', name: name},
          init: {type: 'NewExpression', callee: {type: 'Identifier', name: className}}
        }
      ]
    };

    return node;
  }
}
