'use strict';

var _utilJs = require('./../util.js');

/** @test {SingleDocBuilder} */
describe('MyTypedef:', function () {
  var doc = (0, _utilJs.readDoc)('typedef/index.html');

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="summary"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public MyTypedef1: Object this is MyTypedef1 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');
    });
  });

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has detail.', function () {
    (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(1)', function (doc) {
      _utilJs.assert.includes(doc, '#static-typedef-MyTypedef1', 'public MyTypedef1: Object');
    });
  });
});