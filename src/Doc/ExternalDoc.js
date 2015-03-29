import AbstractDoc from './AbstractDoc.js';

export default class ExternalDoc extends AbstractDoc {
  constructor(ast, node, ...args) {
    node.type = 'External';
    super(ast, node, ...args);
  }

  get kind() {
    return 'external';
  }

  get name() {
    let name = null;
    for (let tag of this._commentTags) {
      if (tag.tagName === '@external') {
        name = tag.tagValue;
      }
    }

    return name;
  }

  get memberof() {
    return null;
  }

  get longname() {
    return `external:${this.name}`;
  }
}
