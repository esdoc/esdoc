import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@experimental} */
describe('testExperimentalVariable', ()=> {
  const doc = readDoc('variable/index.html');

  describe('in summary', ()=> {
    it('has desc', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-variable-testExperimentalVariable"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, '[data-ice="experimental"]', 'this variable is experimental.');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-variable-testExperimentalVariable"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="experimental"]', 'this variable is experimental.');
      });
    });
  });
});
