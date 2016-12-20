import {readDoc, assert, findParent} from './../../../util.js';

/** @test {FunctionDoc#@_name} */
describe('test export arrow function', ()=> {
  const doc = readDoc('function/index.html');

  it('has default import path with direct arrow function definition.', ()=> {
    findParent(doc, '[id="static-function-ArrowFunction"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import ArrowFunction from 'esdoc-test-fixture/src/Export/ArrowFunction.js'`);
    });
  });

  it('has named import path with direct arrow function definition.', ()=>{
    findParent(doc, '[id="static-function-testExportArrowFunction2"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import {testExportArrowFunction2} from 'esdoc-test-fixture/src/Export/ArrowFunction.js'`);
    });
  });

  it('is not documented with direct arrow function expression', ()=> {
    try {
      findParent(doc, '[id="static-function-testExportArrowFunction3"]', '[data-ice="detail"]', ()=>{});
    } catch (e) {
      return;
    }
    assert(false);
  });

  it('has named import path with undocument', ()=>{
    findParent(doc, '[id="static-function-testExportArrowFunction4"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import {testExportArrowFunction4} from 'esdoc-test-fixture/src/Export/ArrowFunction.js'`);
    });
  });

  it('has named import path with indirect function definition.', ()=> {
    findParent(doc, '[id="static-function-testExportArrowFunction5"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import {testExportArrowFunction5} from 'esdoc-test-fixture/src/Export/ArrowFunction.js'`);
    });
  });
});
