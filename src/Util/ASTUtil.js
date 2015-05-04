import estraverse from 'estraverse';

let ESTRAVERSE_KEYS = {
  Super: []
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
}
