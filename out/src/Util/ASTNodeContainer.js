"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ASTNodeContainer = function () {
  function ASTNodeContainer() {
    _classCallCheck(this, ASTNodeContainer);

    this._docId = 0;
    this._nodes = {};
  }

  _createClass(ASTNodeContainer, [{
    key: "addNode",
    value: function addNode(node) {
      this._nodes[this._docId] = node;
      return this._docId++;
    }
  }, {
    key: "getNode",
    value: function getNode(id) {
      return this._nodes[id];
    }
  }]);

  return ASTNodeContainer;
}();

exports.default = new ASTNodeContainer();
module.exports = exports["default"];