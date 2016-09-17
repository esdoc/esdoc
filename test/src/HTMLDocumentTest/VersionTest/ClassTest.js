import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@version} */
describe('TestVersionClass', ()=> {
  const doc = readDoc('class/src/Version/Class.js~TestVersionClass.html');

  describe('in self detail', ()=> {
    it('has version.', ()=> {
      assert.includes(doc, '.header-notice [data-ice="version"]', '1.2.3');
    });
  });

  describe('in summary', ()=> {
    it('has version', ()=> {
      assert.includes(doc, '[data-ice="constructorSummary"] [data-ice="version"]', '1.2.3');

      findParent(doc, '[data-ice="summary"] [href$="#instance-member-p1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, '[data-ice="version"]', '1.2.3');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, '[data-ice="version"]', '1.2.3');
      });
    });
  });

  describe('in details', ()=>{
    it('has version', ()=>{
      findParent(doc, '[id="instance-constructor-constructor"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="version"]', '1.2.3');
      });

      findParent(doc, '[id="instance-member-p1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="version"]', '1.2.3');
      });

      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="version"]', '1.2.3');
      });
    });
  });
});
