import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@since} */
describe('testSinceFunction', ()=> {
  const doc = readDoc('function/index.html');

  describe('in summary', ()=>{
    it('has since.', ()=>{
      findParent(doc, '[data-ice="summary"] [href$="#static-function-testSinceFunction"]', '[data-ice="target"]', (doc)=>{
        assert.includes(doc, '[data-ice="since"]', 'since 1.2.3');
      });
    });
  });

  describe('in detail', ()=>{
    it('has since.', ()=>{
      findParent(doc, '[id="static-function-testSinceFunction"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="since"]', 'since 1.2.3');
      });
    });
  });
});
