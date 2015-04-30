import AbstractDoc from './AbstractDoc.js';
import ParamParser from '../Parser/ParamParser.js';

export default class TestDoc extends AbstractDoc {
  _apply() {
    super._apply();

    this['@testTarget']();

    delete this._value.export;
    delete this._value.importPath;
    delete this._value.importStyle;
  }

  ['@kind']() {
    super['@kind']();
    if (this._value.kind) return;

    switch (this._node.callee.name) {
      case 'describe':
        this._value.kind = 'testDescribe';
        break;
      case 'it':
        this._value.kind = 'testIt';
        break;
      default:
        throw new Error(`unknown name. node.callee.name = ${this._node.callee.name}`);
    }
  }

  ['@name']() {
    super['@name']();
    if (this._value.name) return;

    this._value.name = this._node._esdocTestId;
  }

  ['@memberof']() {
    super['@memberof']();
    if (this._value.memberof) return;

    let chain = [];
    let parent = this._node.parent;
    while (parent) {
      if (parent._esdocTestId) chain.push(parent._esdocTestId);
      parent = parent.parent;
    }

    let filePath = this._pathResolver.filePath;

    if (chain.length) {
      this._value.memberof = `${filePath}~${chain.reverse().join('.')}`;
      this._value.testDepth = chain.length;
    } else {
      this._value.memberof = filePath;
      this._value.testDepth = 0;
    }
  }

  ['@desc']() {
    super['@desc']();
    if (this._value.description) return;

    this._value.description = this._node.arguments[0].value;
  }

  ['@testTarget']() {
    let values = this._findAllTagValues(['@testTarget']);
    if (!values) return;

    this._value.testTargets = [];
    for (let value of values) {
      let {typeText} = ParamParser.parseParamValue(value, true, false, false);
      this._value.testTargets.push(typeText);
    }
  }
}
