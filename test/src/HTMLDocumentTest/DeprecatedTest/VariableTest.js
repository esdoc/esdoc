import {readDoc, assert, find} from './../../util.js';

/** @test {AbstractDoc#@deprecated} */
describe('testDeprecatedVariable:', ()=> {
  const doc = readDoc('variable/index.html');

  describe('in summary', ()=> {
    it('has deprecated message.', ()=> {
      find(doc, '[data-ice="summary"] [href="variable/index.html#static-variable-testDeprecatedVariable"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, '[data-ice="deprecated"]', 'this variable was deprecated.');
      });
    });
  });

  describe('in details', ()=>{
    it('has deprecated message.', ()=>{
      find(doc, '[id="static-variable-testDeprecatedVariable"]', (doc)=>{
        doc = doc.parents('[data-ice="detail"]');
        assert.includes(doc, '[data-ice="deprecated"]', 'this variable was deprecated.');
      });
    });
  });
});
