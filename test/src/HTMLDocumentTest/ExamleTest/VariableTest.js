import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@example} */
describe('testDescVariable', ()=> {
  const doc = readDoc('variable/index.html');

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-variable-testExampleVariable"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="exampleDoc"]', 'const foo = 123;');
      });
    });
  });
});
