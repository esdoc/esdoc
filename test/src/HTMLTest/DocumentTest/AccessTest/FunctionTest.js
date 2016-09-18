import {readDoc, assert, find} from './../../../util.js';

/** @test {SingleDocBuilder} */
describe('TestAccessFunction:', ()=> {
  const doc = readDoc('function/index.html');

  describe('in summary: ', ()=>{
    /** @test {SingleDocBuilder#_buildSingleDoc} */
    it('has public accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="function/index.html#static-function-testAccessFunctionPublic"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'public testAccessFunctionPublic()');
      });
    });

    /** @test {SingleDocBuilder#_buildSingleDoc} */
    it('has protected accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="function/index.html#static-function-testAccessFunctionProtected"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'protected testAccessFunctionProtected()');
      });
    });

    /** @test {SingleDocBuilder#_buildSingleDoc} */
    it('has private accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="function/index.html#static-function-testAccessFunctionPrivate"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'private testAccessFunctionPrivate()');
      });
    });

    /** @test {SingleDocBuilder#_buildSingleDoc} */
    it('has auto private accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="function/index.html#static-function-_testAccessFunctionAutoPrivate"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'private _testAccessFunctionAutoPrivate()');
      });
    });
  });

  describe('in detail: ', ()=>{
    /** @test {SingleDocBuilder#_buildSingleDoc} */
    it('has public accessor.', ()=> {
      assert.includes(doc, '[data-ice="detail"] #static-function-testAccessFunctionPublic', 'public testAccessFunctionPublic()');
    });

    /** @test {SingleDocBuilder#_buildSingleDoc} */
    it('has protected accessor.', ()=> {
      assert.includes(doc, '[data-ice="detail"] #static-function-testAccessFunctionProtected', 'protected testAccessFunctionProtected()');
    });

    /** @test {SingleDocBuilder#_buildSingleDoc} */
    it('has private accessor.', ()=> {
      assert.includes(doc, '[data-ice="detail"] #static-function-testAccessFunctionPrivate', 'private testAccessFunctionPrivate()');
    });

    /** @test {SingleDocBuilder#_buildSingleDoc} */
    it('has auto private accessor.', ()=> {
      assert.includes(doc, '[data-ice="detail"] #static-function-_testAccessFunctionAutoPrivate', 'private _testAccessFunctionAutoPrivate()');
    });
  });
});
