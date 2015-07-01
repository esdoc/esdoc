'use strict';

var _utilJs = require('./../util.js');

/** @test {SingleDocBuilder} */
describe('MyFunction:', function () {
  var doc = (0, _utilJs.readDoc)('function/index.html');

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="summary"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public myFunction1() this is myFunction1 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public myFunction2(p1: number, p2: string) this is myFunction2 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public myFunction3(): number this is myFunction3 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public myFunction4(p1: number, p2: string): number this is myFunction4 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public myFunction5(p1: number, p2: string): Object this is myFunction5 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(6)', 'public * myFunction6(): Generator this is myFunction6 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(7)', 'public myFunction7(p1: *[], p2: number[], p3: {}, p4: {"a": 123, "b": "abc"}): *');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(8)', 'public myFunction8(p1: *)');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'function/index.html#static-function-myFunction1', 'href');
    });
  });

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has detail.', function () {
    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(1)', function (doc) {
      _utilJs.assert.includes(doc, '#static-function-myFunction1', 'public myFunction1()');
      _utilJs.assert.includes(doc, '[data-ice="importPath"]', 'import myFunction1 from \'esdoc-test-fixture/out/src/myFunction.js\'');
    });

    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(2)', function (doc) {
      _utilJs.assert.includes(doc, '#static-function-myFunction2', 'public myFunction2(p1: number, p2: string)');
      _utilJs.assert.includes(doc, '[data-ice="importPath"]', 'import {myFunction2} from \'esdoc-test-fixture/out/src/myFunction.js\'');
    });

    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(3)', function (doc) {
      _utilJs.assert.includes(doc, '#static-function-myFunction3', 'public myFunction3(): number');
      _utilJs.assert.includes(doc, '[data-ice="importPath"]', 'import {myFunction3} from \'esdoc-test-fixture/out/src/myFunction.js\'');
    });

    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(4)', function (doc) {
      _utilJs.assert.includes(doc, '#static-function-myFunction4', 'public myFunction4(p1: number, p2: string): number');
    });

    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(5)', function (doc) {
      _utilJs.assert.includes(doc, '#static-function-myFunction5', 'public myFunction5(p1: number, p2: string): Object');
    });

    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(6)', function (doc) {
      _utilJs.assert.includes(doc, '#static-function-myFunction6', 'public * myFunction6(): Generator');
    });

    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(7)', function (doc) {
      _utilJs.assert.includes(doc, '#static-function-myFunction7', 'public myFunction7(p1: *[], p2: number[], p3: {}, p4: {"a": 123, "b": "abc"}): *');
    });

    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(8)', function (doc) {
      _utilJs.assert.includes(doc, '#static-function-myFunction8', 'public myFunction8(p1: *)');
    });
  });
});