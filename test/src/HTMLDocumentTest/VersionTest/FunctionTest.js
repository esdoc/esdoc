import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@version} */
describe('testVersionFunction', ()=> {
  const doc = readDoc('function/index.html');

  describe('in summary', ()=> {
    it('has version', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-function-testVersionFunction"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, '[data-ice="version"]', '1.2.3');
      });
    });
  });

  describe('in details', ()=>{
    it('has version.', ()=>{
      findParent(doc, '[id="static-function-testVersionFunction"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="version"]', '1.2.3');
      });
    });
  });
});
