import {readDoc, assert, find, findParent} from './../../../util.js';

/** @test {AbstractDoc#@since} */
describe('TestSinceClass', ()=> {
  const doc = readDoc('class/src/Since/Class.js~TestSinceClass.html');

  it('has since at class.', ()=> {
    assert.includes(doc, '.header-notice [data-ice="since"]', 'since 1.2.3');
  });

  describe('in summary', ()=>{
    it('has since at constructor.', ()=>{
      findParent(doc, '[href$="#instance-constructor-constructor"]', '[data-ice="target"]', (doc)=>{
        assert.includes(doc, '[data-ice="since"]', 'since 1.2.3');
      });
    });

    it('has since at member.', ()=>{
      findParent(doc, '[href$="#instance-member-p1"]', '[data-ice="target"]', (doc)=>{
        assert.includes(doc, '[data-ice="since"]', 'since 1.2.3');
      });
    });

    it('has since at method.', ()=>{
      findParent(doc, '[href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=>{
        assert.includes(doc, '[data-ice="since"]', 'since 1.2.3');
      });
    });
  });

  describe('in detail', ()=>{
    it('has since at constructor.', ()=>{
      findParent(doc, '[id="instance-constructor-constructor"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="since"]', 'since 1.2.3');
      });
    });

    it('has since at member.', ()=>{
      findParent(doc, '[id="instance-member-p1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="since"]', 'since 1.2.3');
      });
    });

    it('has since at method.', ()=>{
      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="since"]', 'since 1.2.3');
      });
    });
  });
});
