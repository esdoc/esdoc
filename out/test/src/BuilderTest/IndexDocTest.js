'use strict';

var _utilJs = require('./../util.js');

/** @test {IndexDocBuilder} */
describe('Index:', function () {
  var doc = (0, _utilJs.readDoc)('index.html');

  /** @test {IndexDocBuilder#_buildIndexDoc} */
  it('has README.md', function () {
    _utilJs.assert.includes(doc, '[data-ice="index"]', 'this is ESDoc Test Fixture README.');
  });

  /** @test {IndexDocBuilder#_buildIndexDoc} */
  it('has coverage badge', function () {
    _utilJs.assert.includes(doc, '.esdoc-coverage .esdoc-coverage-ratio', '79%');
  });
});