import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@example} */
describe('testExampleFunction', ()=> {
  const doc = readDoc('function/index.html');

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-function-testExampleFunction"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="exampleDoc"]', 'const foo = 123;');
      });
    });
  });
});
