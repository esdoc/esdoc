import {readDoc, assert, findParent} from './../util.js';

/**
 * @test {TestDocBuilder}
 * @test {TestDocBuilder#_buildTestDescribeDocHTML}
 */
describe('test integration of test', ()=> {
  const doc = readDoc('test.html').find('[data-ice="tests"]');

  describe('describe/it style', ()=>{
    it('has describe', ()=>{
      findParent(doc, 'a[href="test-file/test/DescTest.js.html#lineNumber2"]', '[data-ice="testDescribe"]', (doc)=>{
        assert.includes(doc, null, 'Use describe style mocha interface TestDescClass 3');
        assert.multiIncludes(doc, 'a', [
          'test-file/test/DescTest.js.html#lineNumber2',
          'class/src/Desc/Class.js~TestDescClass.html'
        ], 'href');
      });
    });

    it('has it', ()=>{
      findParent(doc, 'a[href="test-file/test/DescTest.js.html#lineNumber4"]', '[data-ice="testIt"]', (doc)=>{
        assert.includes(doc, null, 'Use it style mocha interface TestDescClass#constructor');
        assert.multiIncludes(doc, 'a', [
          'test-file/test/DescTest.js.html#lineNumber4',
          'class/src/Desc/Class.js~TestDescClass.html#instance-constructor-constructor'
        ], 'href');
      });
    });

    it('has nested describe', ()=>{
      findParent(doc, 'a[href="test-file/test/DescTest.js.html#lineNumber8"]', '[data-ice="testDescribe"]', (doc)=>{
        assert.includes(doc, null, 'Nested describe TestDescClass#p1 1');
        assert.multiIncludes(doc, 'a', [
          'test-file/test/DescTest.js.html#lineNumber8',
          'class/src/Desc/Class.js~TestDescClass.html#instance-member-p1'
        ], 'href');
      });
    });

    it('has nested it', ()=>{
      findParent(doc, 'a[href="test-file/test/DescTest.js.html#lineNumber10"]', '[data-ice="testIt"]', (doc)=>{
        assert.includes(doc, null, 'Nested it in describe testDescVariable');
        assert.multiIncludes(doc, 'a', [
          'test-file/test/DescTest.js.html#lineNumber10',
          'variable/index.html#static-variable-testDescVariable'
        ], 'href');
      });
    });
  });


  describe('context style', ()=>{
    it('has context', ()=>{
      findParent(doc, 'a[href="test-file/test/DescTest.js.html#lineNumber15"]', '[data-ice="testDescribe"]', (doc)=>{
        assert.includes(doc, null, 'Use context style mocha interface TestDescClass#method1 1');
        assert.multiIncludes(doc, 'a', [
          'test-file/test/DescTest.js.html#lineNumber15',
          'class/src/Desc/Class.js~TestDescClass.html#instance-method-method1'
        ], 'href');
      });
    });

    it('has context it', ()=>{
      findParent(doc, 'a[href="test-file/test/DescTest.js.html#lineNumber17"]', '[data-ice="testIt"]', (doc)=>{
        assert.includes(doc, null, 'Nested it in context testDescFunction');
        assert.multiIncludes(doc, 'a', [
          'test-file/test/DescTest.js.html#lineNumber17',
          'function/index.html#static-function-testDescFunction'
        ], 'href');
      });
    });
  });

  describe('suite/test style', ()=>{
    it('has suite', ()=>{
      findParent(doc, 'a[href="test-file/test/DescTest.js.html#lineNumber23"]', '[data-ice="testDescribe"]', (doc)=>{
        assert.includes(doc, null, 'Use suite style mocha interface TestDescClass 2');
        assert.multiIncludes(doc, 'a', [
          'test-file/test/DescTest.js.html#lineNumber23',
          'class/src/Desc/Class.js~TestDescClass.html'
        ], 'href');
      });
    });

    it('has test', ()=>{
      findParent(doc, 'a[href="test-file/test/DescTest.js.html#lineNumber25"]', '[data-ice="testIt"]', (doc)=>{
        assert.includes(doc, null, 'Use test style mocha interface TestDescClass#constructor');
        assert.multiIncludes(doc, 'a', [
          'test-file/test/DescTest.js.html#lineNumber25',
          'class/src/Desc/Class.js~TestDescClass.html#instance-constructor-constructor'
        ], 'href');
      });
    });

    it('has nested suite', ()=>{
      findParent(doc, 'a[href="test-file/test/DescTest.js.html#lineNumber29"]', '[data-ice="testDescribe"]', (doc)=>{
        assert.includes(doc, null, 'Nested suite TestDescClass#p1 1');
        assert.multiIncludes(doc, 'a', [
          'test-file/test/DescTest.js.html#lineNumber29',
          'class/src/Desc/Class.js~TestDescClass.html#instance-member-p1'
        ], 'href');
      });
    });

    it('has nested test', ()=>{
      findParent(doc, 'a[href="test-file/test/DescTest.js.html#lineNumber31"]', '[data-ice="testIt"]', (doc)=>{
        assert.includes(doc, null, 'Nested test TestDescClass#method1');
        assert.multiIncludes(doc, 'a', [
          'test-file/test/DescTest.js.html#lineNumber31',
          'class/src/Desc/Class.js~TestDescClass.html#instance-method-method1'
        ], 'href');
      });
    });
  });
});
