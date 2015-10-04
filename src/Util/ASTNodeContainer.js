class ASTNodeContainer {
  constructor() {
    this._docId = 0;
    this._nodes = {};
  }

  addNode(node) {
    this._nodes[this._docId] = node;
    return this._docId++;
  }

  getNode(id) {
    return this._nodes[id];
  }
}

export default new ASTNodeContainer();
