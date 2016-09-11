import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@_generator} */
describe('TestGeneratorMethod', ()=> {
  const doc = readDoc('class/src/Generator/Method.js~TestGeneratorMethod.html');

  describe('in summary', ()=> {
    it('has generator mark.', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public * method1()');
      });
    });
  });

  describe('in details', ()=>{
    it('has generator mark.', ()=>{
      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public * method1()');
      });
    });
  });
});
