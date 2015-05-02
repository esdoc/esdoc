import {readDoc, assert, find} from './util.js';

describe('TestDocBuilder', ()=> {
  let doc = readDoc('test.html');

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

  it('has test target.', ()=>{
    assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(1) td:nth-of-type(2)', 'ClassDocBuilder');
    assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(1) td:nth-of-type(2) a', 'class/src/ForTestDoc/ClassDocBuilder.js~ClassDocBuilder.html', 'href');

    assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(2) td:nth-of-type(2)', 'ClassDoc#@unknown');
    assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(2) td:nth-of-type(2) a', 'class/src/ForTestDoc/AbstractDoc.js~AbstractDoc.html#instance-method-@unknown', 'href');

    assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(3) td:nth-of-type(2)', 'AbstractDoc#@undocument');
    assert.includes(doc, '[data-ice="tests"] tr:nth-of-type(3) td:nth-of-type(2) a', 'class/src/ForTestDoc/AbstractDoc.js~AbstractDoc.html#instance-method-@undocument', 'href');
  });
});

describe('Symbol to Test', ()=>{
  describe('ClassDocBuilder', ()=>{
    let doc = readDoc('class/src/ForTestDoc/ClassDocBuilder.js~ClassDocBuilder.html');

    it('has test', ()=>{
      assert.includes(doc, '[data-ice="test"]:nth-of-type(1)', 'MyClass1:');
      assert.includes(doc, '[data-ice="test"]:nth-of-type(1) a', 'test-file/src/DocTest/ClassDocTest.js.html#lineNumber4', 'href');
    });
  });

  describe('AbstractDoc', ()=>{
    let doc = readDoc('class/src/ForTestDoc/AbstractDoc.js~AbstractDoc.html');

    it('has test', ()=>{
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="test"]:nth-of-type(1)', 'MyClass1: has undocument tag');
        assert.includes(doc, '[data-ice="test"]:nth-of-type(1) a', 'test-file/src/DocTest/ClassDocTest.js.html#lineNumber16', 'href');
      });

      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="test"]:nth-of-type(1)', 'MyClass1: has unknown tag.');
        assert.includes(doc, '[data-ice="test"]:nth-of-type(1) a', 'test-file/src/DocTest/ClassDocTest.js.html#lineNumber8', 'href');
      });
    });
  });
});

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
suite('Use suite style mocha interface', ()=>{
  test('Use test style mocha interface', ()=>{
  });

  suite('Nested suite', ()=>{
    test('Nested test', ()=>{
    });
  })
});
