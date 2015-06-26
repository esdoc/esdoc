'use strict';

var _utilJs = require('./../util.js');

/** @test {SingleDocBuilder} */
describe('MyVariable:', function () {
  var doc = (0, _utilJs.readDoc)('variable/index.html');

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="summary"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public myVariable1: Object this is myVariable1 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public myVariable2: number this is myVariable2 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public myVariable3: number this is myVariable3 desc.');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'variable/index.html#static-variable-myVariable1', 'href');
    });
  });

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has detail.', function () {
    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(1)', function (doc) {
      _utilJs.assert.includes(doc, '#static-variable-myVariable1', 'public myVariable1: Object');
      _utilJs.assert.includes(doc, '[data-ice="importPath"]', 'import myVariable1 from \'esdoc-test-fixture/out/src/myVariable.js\'');
    });

    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(2)', function (doc) {
      _utilJs.assert.includes(doc, '#static-variable-myVariable2', 'public myVariable2: number');
      _utilJs.assert.includes(doc, '[data-ice="importPath"]', 'import {myVariable2} from \'esdoc-test-fixture/out/src/myVariable.js\'');
    });

    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(3)', function (doc) {
      _utilJs.assert.includes(doc, '#static-variable-myVariable3', 'public myVariable3: number');
    });
  });
});