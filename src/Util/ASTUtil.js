import estraverse from 'estraverse';

export default class ASTUtil {
  static traverse(ast, callback) {
    estraverse.traverse(ast, {
      enter: function(node, parent) {
        callback.call(this, node, parent);
      }
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
      }
    });

    return path;
  }
}
