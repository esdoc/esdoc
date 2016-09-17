import {readDoc, assert, findParent} from './../util.js';

/** @test {ClassDocBuilder} */
describe('test link of test', ()=>{
  const doc = readDoc('class/src/Desc/Class.js~TestDescClass.html');

  it('has link of test at class', ()=>{
    assert.multiIncludes(doc, '.self-detail [data-ice="test"] a', [
      'Use describe style mocha interface',
      'Use suite style mocha interface'
    ]);

    assert.multiIncludes(doc, '.self-detail [data-ice="test"] a', [
      'test-file/test/DescTest.js.html#lineNumber2',
      'test-file/test/DescTest.js.html#lineNumber23'
    ], 'href');
  });

  it('has link of test at constructor', ()=>{
    findParent(doc, '#instance-constructor-constructor', '[data-ice="detail"]', (doc)=>{
      assert.multiIncludes(doc, '[data-ice="test"] a', [
        'Use describe style mocha interface Use it style mocha interface',
        'Use suite style mocha interface Use test style mocha interface'
      ]);

      assert.multiIncludes(doc, '[data-ice="test"] a', [
        'test-file/test/DescTest.js.html#lineNumber4',
        'test-file/test/DescTest.js.html#lineNumber25',
      ], 'href');
    });
  });

  it('has link of test at member', ()=>{
    findParent(doc, '#instance-member-p1', '[data-ice="detail"]', (doc)=>{
      assert.multiIncludes(doc, '[data-ice="test"] a', [
        'Use describe style mocha interface Nested describe',
        'Use suite style mocha interface Nested suite'
      ]);

      assert.multiIncludes(doc, '[data-ice="test"] a', [
        'test-file/test/DescTest.js.html#lineNumber8',
        'test-file/test/DescTest.js.html#lineNumber29'
      ], 'href');
    });
  });

  it('has link of test at method', ()=>{
    findParent(doc, '#instance-method-method1', '[data-ice="detail"]', (doc)=>{
      assert.multiIncludes(doc, '[data-ice="test"] a', [
        'Use describe style mocha interface Use context style mocha interface',
        'Use suite style mocha interface Nested suite Nested test'
      ]);

      assert.multiIncludes(doc, '[data-ice="test"] a', [
        'test-file/test/DescTest.js.html#lineNumber15',
        'test-file/test/DescTest.js.html#lineNumber31'
      ], 'href');
    });
  });
});
