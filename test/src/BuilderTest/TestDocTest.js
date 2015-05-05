import {readDoc, assert, find} from './../util.js';

/** @testTarget {TestDocBuilder} */
describe('TestDocBuilder:', ()=> {
  let doc = readDoc('test.html');

  /** @testTarget {TestDocBuilder#_buildTestDescribeDocHTML} */
  it('has test description.', ()=> {
    assert.includes(doc, '[data-ice="tests"]', 'Use describe style mocha interface');
    assert.includes(doc, '[data-ice="tests"]', 'Use it style mocha interface');
    assert.includes(doc, '[data-ice="tests"]', 'Nested describe');
    assert.includes(doc, '[data-ice="tests"]', 'Nested it in describe');
    assert.includes(doc, '[data-ice="tests"]', 'Use context style mocha interface');
    assert.includes(doc, '[data-ice="tests"]', 'Nested it in context');
    assert.includes(doc, '[data-ice="tests"]', 'Use suite style mocha interface');
    assert.includes(doc, '[data-ice="tests"]', 'Use test style mocha interface');
    assert.includes(doc, '[data-ice="tests"]', 'Nested suite');
    assert.includes(doc, '[data-ice="tests"]', 'Nested test');
  });

  /** @testTarget {TestDocBuilder#_buildTestDescribeDocHTML} */
  it('has test target.', ()=>{
    assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(1) td:nth-of-type(2)', 'ClassDocBuilder');
    assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(1) td:nth-of-type(2) a', 'class/src/ForTestDoc/ClassDocBuilder.js~ClassDocBuilder.html', 'href');

    assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(3) td:nth-of-type(2)', 'ClassDocBuilder#_buildClassDoc');
    assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(3) td:nth-of-type(2) a', 'class/src/ForTestDoc/ClassDocBuilder.js~ClassDocBuilder.html#instance-method-_buildClassDoc', 'href');
  });
});

describe('Identifier to Test:', ()=>{
  /** @testTarget {ClassDocBuilder} */
  describe('ClassDocBuilder:', ()=>{
    let doc = readDoc('class/src/ForTestDoc/ClassDocBuilder.js~ClassDocBuilder.html');

    /** @testTarget {ClassDocBuilder#_buildClassDoc} */
    it('has test', ()=>{
      assert.includes(doc, '.self-detail [data-ice="test"]:nth-of-type(1)', 'MyClass1:');
      assert.includes(doc, '.self-detail [data-ice="test"]:nth-of-type(1) a', 'test-file/src/BuilderTest/ClassDocTest.js.html#lineNumber4', 'href');
    });
  });
});

/** @testTarget {TestDocFactory#_pushForMocha} */
describe('Use describe style mocha interface', ()=>{
  it('Use it style mocha interface', ()=>{
  });

  describe('Nested describe', ()=>{
    it('Nested it in describe', ()=>{
    });
  });

  context('Use context style mocha interface', ()=>{
    it('Nested it in context', ()=>{
    });
  });
});

let suite = describe;
let test = it;
/** @testTarget {TestDocFactory#_pushForMocha} */
suite('Use suite style mocha interface', ()=>{
  test('Use test style mocha interface', ()=>{
  });

  suite('Nested suite', ()=>{
    test('Nested test', ()=>{
    });
  })
});
