import {readDoc, assert, find} from './../../util.js';

/** @test {AbstractDoc#@deprecated} */
describe('testDeprecatedFunction:', ()=> {
  const doc = readDoc('function/index.html');

  describe('in summary', ()=> {
    it('has deprecated message.', ()=> {
      find(doc, '[data-ice="summary"] [href="function/index.html#static-function-testDeprecatedFunction"]', (doc)=>{
        doc = doc.parents('[data-ice="target"]');
        assert.includes(doc, '[data-ice="deprecated"]', 'this function was deprecated.');
      });
    });
  });

  describe('in details', ()=>{
    it('has deprecated message of member and method.', ()=>{
      find(doc, '[id="static-function-testDeprecatedFunction"]', (doc)=>{
        doc = doc.parents('[data-ice="detail"]');
        assert.includes(doc, '[data-ice="deprecated"]', 'this function was deprecated.');
      });
    });
  });
});
