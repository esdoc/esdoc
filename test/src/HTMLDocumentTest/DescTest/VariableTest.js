import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@desc} */
describe('testDescVariable', ()=> {
  const doc = readDoc('variable/index.html');

  describe('in summary', ()=> {
    it('has desc', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-variable-testDescVariable"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, '[data-ice="description"]', 'this is testDescVariable.');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-variable-testDescVariable"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="description"]', 'this is testDescVariable.');
      });
    });
  });
});
