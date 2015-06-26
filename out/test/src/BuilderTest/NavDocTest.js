'use strict';

var _utilJs = require('./../util.js');

/** @test {DocBuilder#_buildNavDoc} */
describe('Nav:', function () {
  var doc = (0, _utilJs.readDoc)('index.html');

  /** @test {DocBuilder#_buildNavDoc} */
  it('has class nav.', function () {
    (0, _utilJs.find)(doc, '[data-ice="nav"] [data-ice="classWrap"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="classDoc"]:nth-of-type(4)', 'MyClass1');
      _utilJs.assert.includes(doc, '[data-ice="classDoc"]:nth-of-type(4) a', 'class/src/MyClass.js~MyClass1.html', 'href');
    });
  });

  /** @test {DocBuilder#_buildNavDoc} */
  it('has interface nav.', function () {
    (0, _utilJs.find)(doc, '[data-ice="nav"] [data-ice="interfaceWrap"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="interfaceDoc"]:nth-of-type(2)', 'MyInterface1');
      _utilJs.assert.includes(doc, '[data-ice="interfaceDoc"]:nth-of-type(2) a', 'class/src/MyInterface.js~MyInterface1.html', 'href');
    });
  });

  /** @test {DocBuilder#_buildNavDoc} */
  it('has function nav.', function () {
    (0, _utilJs.find)(doc, '[data-ice="nav"] [data-ice="functionWrap"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="functionDoc"]:nth-of-type(1)', 'myFunction1');
      _utilJs.assert.includes(doc, '[data-ice="functionDoc"]:nth-of-type(1) a', 'function/index.html#static-function-myFunction1', 'href');
    });
  });

  /** @test {DocBuilder#_buildNavDoc} */
  it('has variable nav.', function () {
    (0, _utilJs.find)(doc, '[data-ice="nav"] [data-ice="variableWrap"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="variableDoc"]:nth-of-type(1)', 'myVariable1');
      _utilJs.assert.includes(doc, '[data-ice="variableDoc"]:nth-of-type(1) a', 'variable/index.html#static-variable-myVariable1', 'href');
    });
  });

  /** @test {DocBuilder#_buildNavDoc} */
  it('has typedef nav.', function () {
    (0, _utilJs.find)(doc, '[data-ice="nav"] [data-ice="typedefWrap"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="typedefDoc"]:nth-of-type(1)', 'MyTypedef1');
      _utilJs.assert.includes(doc, '[data-ice="typedefDoc"]:nth-of-type(1) a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');
    });
  });

  /** @test {DocBuilder#_buildNavDoc} */
  it('has external nav.', function () {
    (0, _utilJs.find)(doc, '[data-ice="nav"] [data-ice="externalWrap"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="externalDoc"]:nth-of-type(1)', 'MyError2');
      _utilJs.assert.includes(doc, '[data-ice="externalDoc"]:nth-of-type(1) a', 'example.com', 'href');
    });
  });
});