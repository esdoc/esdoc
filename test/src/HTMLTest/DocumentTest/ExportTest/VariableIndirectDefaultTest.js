import {readDoc, assert, findParent} from './../../../util.js';

/** @test {VariableDoc#@_name} */
describe('test export variable indirect default', ()=> {
  const doc = readDoc('variable/index.html');

  it('has default import path with indirect variable definition.', ()=> {
    findParent(doc, '[id="static-variable-testExportVariableIndirectDefault"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', `import testExportVariableIndirectDefault from 'esdoc-test-fixture/src/Export/VariableIndirectDefault.js'`);
    });
  });
});
