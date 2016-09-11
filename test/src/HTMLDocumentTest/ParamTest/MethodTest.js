import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@desc} */
describe('TestParamMethod', ()=> {
  const doc = readDoc('class/src/Param/Method.js~TestParamMethod.html');

  describe('in summary', ()=> {
    it('has desc', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method1(p1: number)');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method1(p1: number)');
        assert.includes(doc, '.params tbody tr:nth-child(1)', 'p1 number this is p1.');
      });
    });
  });
});
