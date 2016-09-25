import {readDoc, assert, findParent} from './../../../util.js';

/** @test {FunctionDoc#_$async} */
describe('testAsyncFunction', ()=> {
  const doc = readDoc('function/index.html');

  describe('in summary', ()=> {
    it('has async mark', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-function-testAsyncFunction"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public async testAsyncFunction()');
      });
    });
  });

  describe('in details', ()=>{
    it('has async mark.', ()=>{
      findParent(doc, '[id="static-function-testAsyncFunction"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public async testAsyncFunction()');
      });
    });
  });
});
