import {readDoc, assert, find} from './../../../util.js';

/** @test {DocResolver#_resolveIgnore */
describe('test ignore class', ()=>{

  describe('TestIgnoreClass1', ()=> {
    it('is not documented.', ()=> {
      assert.throws(()=> readDoc('class/src/Ignore/Class.js~TestIgnoreClass1.html'));
    });
  });

  describe('TestIgnoreClass2', ()=>{
    const doc = readDoc('class/src/Ignore/Class.js~TestIgnoreClass2.html');

    it('does not have ignored member.', ()=>{
      assert.throws(()=> find(doc, '[data-ice="summary"] [href$="#instance-member-p1"]', ()=>{}));
      assert.throws(()=> find(doc, '[id="instance-member-p1"]', ()=>{}));
    });

    it('does not have ignored method.', ()=>{
      assert.throws(()=> find(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', ()=>{}));
      assert.throws(()=> find(doc, '[id="instance-method-method1"]', ()=>{}));
    });
  });
});
