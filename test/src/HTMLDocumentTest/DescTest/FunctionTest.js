import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@desc} */
describe('testDescFunction', ()=> {
  const doc = readDoc('function/index.html');

  describe('in summary', ()=> {
    it('has desc', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-function-testDescFunction"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, '[data-ice="description"]', 'this is testDescFunction.');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-function-testDescFunction"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="description"]', 'this is testDescFunction.');
      });
    });
  });
});
