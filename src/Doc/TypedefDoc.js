import AbstractDoc from './AbstractDoc.js';

export default class TypedefDoc extends AbstractDoc {
  constructor(ast, node, ...args) {
    node.type = 'Typedef';
    super(ast, node, ...args);
  }

  get kind() {
    return 'typedef';
  }

  get name() {
    let name = null;
    for (let tag of this._commentTags) {
      if (tag.tagName === '@typedef') {
        let matched = tag.tagValue.match(/(\S+)$/);
        if (matched) {
          name = matched[1];
        }
      }
    }

    return name;
  }
}
