import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@_generator} */
describe('testGeneratorFunction', ()=> {
  const doc = readDoc('function/index.html');

  describe('in summary', ()=> {
    it('has generator mark', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-function-testGeneratorFunction"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public * testGeneratorFunction()');
      });
    });
  });

  describe('in details', ()=>{
    it('has generator mark.', ()=>{
      findParent(doc, '[id="static-function-testGeneratorFunction"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public * testGeneratorFunction()');
      });
    });
  });
});
