'use strict';

var _utilJs = require('./../util.js');

/** @test {ASTUtil} */
describe('ASTUtil:', function () {
  /** @test {ASTUtil.traverse} */
  it('can traverse React JSX.', function () {
    var doc = global.db.find({ name: 'ReactJSXClass' })[0];
    _utilJs.assert.equal(doc.name, 'ReactJSXClass');
  });
});