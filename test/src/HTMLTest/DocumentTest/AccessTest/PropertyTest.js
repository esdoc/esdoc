import {readDoc, assert, find} from './../../../util.js';

/** @test {ClassDocBuilder#_buildClassDoc} */
describe('TestAccessProperty:', ()=> {
  const doc = readDoc('class/src/Access/Property.js~TestAccessProperty.html');

  describe('in summary:', ()=>{
    it('has public accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="class/src/Access/Property.js~TestAccessProperty.html#instance-member-p1"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'public p1:');
      });
    });

    it('has protected accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="class/src/Access/Property.js~TestAccessProperty.html#instance-member-p2"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'protected p2: ');
      });
    });

    it('has private accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="class/src/Access/Property.js~TestAccessProperty.html#instance-member-p3"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'private p3: ');
      });
    });

    it('has auto private accessor.', ()=> {
      find(doc, '[data-ice="summary"] [href="class/src/Access/Property.js~TestAccessProperty.html#instance-member-_p4"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, null, 'private _p4: ');
      });
    });

  });

  describe('in detail:', ()=>{
    it('has public accessor.', ()=>{
      assert.includes(doc, '#instance-member-p1', 'public p1:');
    });

    it('has protected accessor.', ()=>{
      assert.includes(doc, '#instance-member-p2', 'protected p2:');
    });

    it('has private accessor.', ()=>{
      assert.includes(doc, '#instance-member-p3', 'private p3:');
    });

    it('has auto private accessor.', ()=>{
      assert.includes(doc, '#instance-member-_p4', 'private _p4:');
    });
  });
});
