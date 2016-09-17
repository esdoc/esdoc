import {readDoc, assert, findParent} from './../util.js';

/** @test {DocBuilder#_buildNavDoc} */
describe('test navigation:', ()=> {
  const doc = readDoc('index.html');

  it('has class', ()=>{
    findParent(doc, '[data-ice="nav"] a[href="class/src/Desc/Class.js~TestDescClass.html"]', '[data-ice="doc"]', (doc)=>{
      assert.includes(doc, null, 'TestDescClass');
    });
  });

  it('has interface.', ()=>{
    findParent(doc, '[data-ice="nav"] a[href="class/src/Interface/Definition.js~TestInterfaceDefinition.html"]', '[data-ice="doc"]', (doc)=>{
      assert.includes(doc, null, 'TestInterfaceDefinition');
    });
  });

  it('has function.', ()=>{
    findParent(doc, '[data-ice="nav"] a[href="function/index.html#static-function-testDescFunction"]', '[data-ice="doc"]', (doc)=>{
      assert.includes(doc, null, 'testDescFunction');
    });
  });

  it('has variable.', ()=>{
    findParent(doc, '[data-ice="nav"] a[href="variable/index.html#static-variable-testDescVariable"]', '[data-ice="doc"]', (doc)=>{
      assert.includes(doc, null, 'testDescVariable');
    });
  });

  it('has typedef.', ()=>{
    findParent(doc, '[data-ice="nav"] a[href="typedef/index.html#static-typedef-TestTypedefDefinition"]', '[data-ice="doc"]', (doc)=>{
      assert.includes(doc, null, 'TestTypedefDefinition');
    });
  });

  it('has external.', ()=>{
    findParent(doc, '[data-ice="nav"] a[href="http://example.com"]', '[data-ice="doc"]', (doc)=>{
      assert.includes(doc, null, 'TestExternalDefinition');
    });
  });
});

