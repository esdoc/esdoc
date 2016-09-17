import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@desc} */
describe('TestDescClass', ()=> {
  const doc = readDoc('class/src/Desc/Class.js~TestDescClass.html');

  describe('in self detail', ()=> {
    it('has desc.', ()=> {
      assert.includes(doc, '.self-detail [data-ice="description"]', 'this is TestDescClass.');
    });
  });

  describe('in summary', ()=> {
    it('has desc', ()=> {
      assert.includes(doc, '[data-ice="constructorSummary"] [data-ice="description"]', 'this is constructor.');

      findParent(doc, '[data-ice="summary"] [href$="#instance-member-p1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, '[data-ice="description"]', 'this is p1.');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, '[data-ice="description"]', 'this is method1.');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="instance-constructor-constructor"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="description"]', 'this is constructor.');
      });

      findParent(doc, '[id="instance-member-p1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="description"]', 'this is p1.');
      });

      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="description"]', 'this is method1.');
      });
    });
  });
});
