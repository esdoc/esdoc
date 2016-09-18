import {readDoc, assert, findParent} from './../../../util.js';

/** @test {ClassDoc#@_name} */
describe('TestExportAnonymousClass', ()=> {
  const doc = readDoc('class/src/Export/Anonymous.js~Anonymous.html');

  describe('in self detail', ()=> {
    it('is named with anonymous.', ()=> {
      assert.includes(doc, '[data-ice="importPath"]', `import Anonymous from 'esdoc-test-fixture/src/Export/Anonymous.js'`);
      assert.includes(doc, '.self-detail [data-ice="name"]', 'Anonymous');
    });
  });
});

/** @test {FunctionDoc#@_name} */
describe('testExportAnonymousFunction', ()=> {
  const doc = readDoc('function/index.html');

  describe('in summary', ()=> {
    it('has desc', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-function-Anonymous1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public Anonymous1()');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-function-Anonymous1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public Anonymous1()');
        assert.includes(doc, '[data-ice="importPath"]', `import Anonymous1 from 'esdoc-test-fixture/src/Export/Anonymous.js'`);
      });
    });
  });
});
