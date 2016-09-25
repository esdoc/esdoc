import {readDoc, assert, findParent} from './../../../util.js';

/** @test {MethodDoc#_$async} */
describe('TestAsyncMethod', ()=> {
  const doc = readDoc('class/src/Async/Method.js~TestAsyncMethod.html');

  describe('in summary', ()=> {
    it('has async mark.', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public async method1()');
      });
    });
  });

  describe('in details', ()=>{
    it('has async mark.', ()=>{
      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public async method1()');
      });
    });
  });
});
