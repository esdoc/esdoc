import {readDoc, assert, find} from './../../util.js';

/** @test {SingleDocBuilder} */
describe('TestAccessVariable:', ()=> {
  const doc = readDoc('variable/index.html');

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  describe('in summary: ', ()=>{
    it('has public accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="variable/index.html#static-variable-testAccessVariablePublic"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'public testAccessVariablePublic:');
      });
    });

    it('has protected accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="variable/index.html#static-variable-testAccessVariableProtected"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'protected testAccessVariableProtected:');
      });
    });

    it('has private accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="variable/index.html#static-variable-testAccessVariablePrivate"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'private testAccessVariablePrivate:');
      });
    });

    it('has auto private accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="variable/index.html#static-variable-_testAccessVariableAutoPrivate"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'private _testAccessVariableAutoPrivate:');
      });
    });

  });

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  describe('in detail: ', ()=>{
    it('has public accessor.', ()=> {
      assert.includes(doc, '[data-ice="detail"] #static-variable-testAccessVariablePublic', 'public testAccessVariablePublic:');
    });

    it('has protected accessor.', ()=> {
      assert.includes(doc, '[data-ice="detail"] #static-variable-testAccessVariableProtected', 'protected testAccessVariableProtected:');
    });

    it('has private accessor.', ()=> {
      assert.includes(doc, '[data-ice="detail"] #static-variable-testAccessVariablePrivate', 'private testAccessVariablePrivate:');
    });

    it('has auto private accessor.', ()=> {
      assert.includes(doc, '[data-ice="detail"] #static-variable-_testAccessVariableAutoPrivate', 'private _testAccessVariableAutoPrivate:');
    });
  });
});
