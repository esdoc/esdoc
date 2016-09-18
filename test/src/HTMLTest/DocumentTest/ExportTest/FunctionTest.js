import {readDoc, assert, findParent} from './../../../util.js';

/** @test {FunctionDoc#@_name} */
describe('test export function', ()=> {
  const doc = readDoc('function/index.html');

  it('has default import path with direct function definition.', ()=> {
    findParent(doc, '[id="static-function-testExportFunction1"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import testExportFunction1 from 'esdoc-test-fixture/src/Export/Function.js'`);
    });
  });

  it('has named import path with direct function definition.', ()=>{
    findParent(doc, '[id="static-function-testExportFunction2"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import {testExportFunction2} from 'esdoc-test-fixture/src/Export/Function.js'`);
    });
  });

  it('has named import path with direct function expression', ()=>{
    findParent(doc, '[id="static-function-testExportFunction3"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import {testExportFunction3} from 'esdoc-test-fixture/src/Export/Function.js'`);
    });
  });

  it('is not documented with direct function definition', ()=> {
    try {
      findParent(doc, '[id="static-function-testExportFunction4"]', '[data-ice="detail"]', (doc)=>{});
    } catch(e) {
      return;
    }
    assert(false);
  });

  it('is not documented with direct function expression', ()=> {
    try {
      findParent(doc, '[id="static-function-testExportFunction5"]', '[data-ice="detail"]', (doc)=>{});
    } catch(e) {
      return;
    }
    assert(false);
  });

  it('has named import path with direct generator function definition.', ()=>{
    findParent(doc, '[id="static-function-testExportFunction6"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import {testExportFunction6} from 'esdoc-test-fixture/src/Export/Function.js'`);
    });
  });

  it('has named import path with undocument', ()=>{
    findParent(doc, '[id="static-function-testExportFunction7"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import {testExportFunction7} from 'esdoc-test-fixture/src/Export/Function.js'`);
    });
  });

  it('has default import path with indirect function definition', ()=>{
    findParent(doc, '[id="static-function-testExportFunction8"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import testExportFunction8 from 'esdoc-test-fixture/src/Export/Function.js'`);
    });
  });

  it('has named import path with indirect function definition.', ()=> {
    findParent(doc, '[id="static-function-testExportFunction9"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import {testExportFunction9} from 'esdoc-test-fixture/src/Export/Function.js'`);
    });
  });
});
