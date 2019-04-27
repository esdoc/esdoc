"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _default = new ASTNodeContainer();

exports.default = _default;