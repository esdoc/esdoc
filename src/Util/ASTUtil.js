import estraverse from 'estraverse';

let ESTRAVERSE_KEYS = {
  Super: []
};

export default class ASTUtil {
  static traverse(ast, callback) {
    estraverse.traverse(ast, {
      enter: function(node, parent) {
        callback.call(this, node, parent);
      },

      keys: ESTRAVERSE_KEYS
    });
  }

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
