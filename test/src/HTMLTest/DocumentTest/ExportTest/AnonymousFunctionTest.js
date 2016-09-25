import {readDoc, assert, findParent} from './../../../util.js';

/** @test {FunctionDoc#@_name} */
describe('testExportAnonymousFunction', ()=> {
  const doc = readDoc('function/index.html');

  describe('in summary', ()=> {
    it('has desc', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-function-AnonymousFunction"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public AnonymousFunction()');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-function-AnonymousFunction"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public AnonymousFunction()');
        assert.includes(doc, '[data-ice="importPath"]', `import AnonymousFunction from 'esdoc-test-fixture/src/Export/AnonymousFunction.js'`);
      });
    });
  });
});
