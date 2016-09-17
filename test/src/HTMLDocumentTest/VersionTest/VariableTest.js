import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@version} */
describe('testVersionVariable', ()=> {
  const doc = readDoc('variable/index.html');

  describe('in summary', ()=> {
    it('has version', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-variable-testVersionVariable"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, '[data-ice="version"]', '1.2.3');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-variable-testVersionVariable"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="version"]', '1.2.3');
      });
    });
  });
});
