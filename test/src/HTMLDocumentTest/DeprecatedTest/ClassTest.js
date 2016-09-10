import {readDoc, assert, find} from './../../util.js';

/** @test {AbstractDoc#@deprecated} */
describe('TestDeprecatedClass:', ()=> {
  const doc = readDoc('class/src/Deprecated/Class.js~TestDeprecatedClass.html');

  describe('in self detail:', ()=> {
    it('has deprecated message of self.', ()=> {
      assert.includes(doc, '.self-detail [data-ice="deprecated"]', 'this class was deprecated. this is deprecated.');
    });
  });

  describe('in summary:', ()=> {
    it('has deprecated message of member and method.', ()=> {
      find(doc, '[data-ice="summary"] [href="class/src/Deprecated/Class.js~TestDeprecatedClass.html#instance-member-p1"]', (doc)=> {
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, '[data-ice="deprecated"]', 'this member was deprecated.');
      });

      find(doc, '[data-ice="summary"] [href="class/src/Deprecated/Class.js~TestDeprecatedClass.html#instance-method-method1"]', (doc)=> {
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, '[data-ice="deprecated"]', 'this method was deprecated.');
      });
    });
  });

  describe('in details:', ()=>{
    it('has deprecated message of member and method.', ()=>{
      find(doc, '[id="instance-member-p1"]', (doc)=>{
        doc = doc.parents('[data-ice="detail"]');
        assert.includes(doc, '[data-ice="deprecated"]', 'this member was deprecated.');
      });

      find(doc, '[id="instance-method-method1"]', (doc)=>{
        doc = doc.parents('[data-ice="detail"]');
        assert.includes(doc, '[data-ice="deprecated"]', 'this method was deprecated.');
      });
    });
  });
});
