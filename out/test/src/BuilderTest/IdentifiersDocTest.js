'use strict';

var _utilJs = require('./../util.js');

/** @test {IdentifiersDocBuilder} */
describe('Identifiers:', function () {
  var doc = (0, _utilJs.readDoc)('identifiers.html');

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has class summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="classSummary"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public MyClass1 this class was deprecated. use MyClass1Ex instead of this class. this class is experimental. this class is dangerous. this is MyClass1 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(14)', 'public SuperMyClass1 this is SuperMyClass1.');
    });
  });

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has interface summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="interfaceSummary"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public MyInterface3 this is MyInterface3 desc.');
    });
  });

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has function summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="functionSummary"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public myFunction1() this is myFunction1 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public myFunction5(p1: number, p2: string): Object this is myFunction5 desc.');
    });
  });

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has variable summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="variableSummary"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public myVariable1: Object this is myVariable1 desc.');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public myVariable3: number this is myVariable3 desc.');
    });
  });

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has typedef summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="typedefSummary"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public MyTypedef1: Object this is MyTypedef1 desc.');
    });
  });
});