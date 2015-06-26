'use strict';

var _utilJs = require('./../util.js');

/** @test {TestDocBuilder} */
describe('TestDocBuilder:', function () {
  var doc = (0, _utilJs.readDoc)('test.html');

  /** @test {TestDocBuilder#_buildTestDescribeDocHTML} */
  it('has test description.', function () {
    _utilJs.assert.includes(doc, '[data-ice="tests"]', 'Use describe style mocha interface');
    _utilJs.assert.includes(doc, '[data-ice="tests"]', 'Use it style mocha interface');
    _utilJs.assert.includes(doc, '[data-ice="tests"]', 'Nested describe');
    _utilJs.assert.includes(doc, '[data-ice="tests"]', 'Nested it in describe');
    _utilJs.assert.includes(doc, '[data-ice="tests"]', 'Use context style mocha interface');
    _utilJs.assert.includes(doc, '[data-ice="tests"]', 'Nested it in context');
    _utilJs.assert.includes(doc, '[data-ice="tests"]', 'Use suite style mocha interface');
    _utilJs.assert.includes(doc, '[data-ice="tests"]', 'Use test style mocha interface');
    _utilJs.assert.includes(doc, '[data-ice="tests"]', 'Nested suite');
    _utilJs.assert.includes(doc, '[data-ice="tests"]', 'Nested test');
  });

  /** @test {TestDocBuilder#_buildTestDescribeDocHTML} */
  it('has test target.', function () {
    _utilJs.assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(1) td:nth-of-type(2)', 'ClassDocBuilder');
    _utilJs.assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(1) td:nth-of-type(2) a', 'class/src/ForTestDoc/ClassDocBuilder.js~ClassDocBuilder.html', 'href');

    _utilJs.assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(3) td:nth-of-type(2)', 'ClassDocBuilder#_buildClassDoc');
    _utilJs.assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(3) td:nth-of-type(2) a', 'class/src/ForTestDoc/ClassDocBuilder.js~ClassDocBuilder.html#instance-method-_buildClassDoc', 'href');
  });
});

describe('Identifier to Test:', function () {
  /** @test {ClassDocBuilder} */
  describe('ClassDocBuilder:', function () {
    var doc = (0, _utilJs.readDoc)('class/src/ForTestDoc/ClassDocBuilder.js~ClassDocBuilder.html');

    /** @test {ClassDocBuilder#_buildClassDoc} */
    it('has test', function () {
      _utilJs.assert.includes(doc, '.self-detail [data-ice="test"]:nth-of-type(1)', 'MyClass1:');
      _utilJs.assert.includes(doc, '.self-detail [data-ice="test"]:nth-of-type(1) a', 'test-file/src/BuilderTest/ClassDocTest.js.html#lineNumber4', 'href');
    });
  });
});

/** @test {TestDocFactory#_pushForMocha} */
describe('Use describe style mocha interface', function () {
  it('Use it style mocha interface', function () {});

  describe('Nested describe', function () {
    it('Nested it in describe', function () {});
  });

  context('Use context style mocha interface', function () {
    it('Nested it in context', function () {});
  });
});

var suite = describe;
var test = it;
/** @test {TestDocFactory#_pushForMocha} */
suite('Use suite style mocha interface', function () {
  test('Use test style mocha interface', function () {});

  suite('Nested suite', function () {
    test('Nested test', function () {});
  });
});