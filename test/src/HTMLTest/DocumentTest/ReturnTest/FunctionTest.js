import {readDoc, assert, findParent} from './../../../util.js';

/** @test {FunctionDoc#@return} */
describe('test return', ()=>{
  const doc = readDoc('function/index.html');

  describe('testReturnFunction1', ()=> {

    describe('in summary', ()=> {
      it('has return.', ()=> {
        findParent(doc, '[data-ice="summary"] [href$="#static-function-testReturnFunction1"]', '[data-ice="target"]', (doc)=> {
          assert.includes(doc, null, 'public testReturnFunction1(): TestClassDefinition');
        });
      });
    });

    describe('in details', ()=>{
      it('has return.', ()=>{
        findParent(doc, '[id="static-function-testReturnFunction1"]', '[data-ice="detail"]', (doc)=>{
          assert.includes(doc, 'h3', 'public testReturnFunction1(): TestClassDefinition');
          assert.includes(doc, '[data-ice="returnParams"] tbody tr', 'TestClassDefinition this is return value.');
          assert.includes(doc, '[data-ice="returnParams"] tbody tr a', 'class/src/Class/Definition.js~TestClassDefinition.html', 'href');
        });
      });
    });
  });

  describe('testReturnFunction2', ()=> {

    describe('in summary', ()=> {
      it('has return.', ()=> {
        findParent(doc, '[data-ice="summary"] [href$="#static-function-testReturnFunction2"]', '[data-ice="target"]', (doc)=> {
          assert.includes(doc, null, 'public testReturnFunction2(): number');
        });
      });
    });

    describe('in details', ()=>{
      it('has return.', ()=>{
        findParent(doc, '[id="static-function-testReturnFunction2"]', '[data-ice="detail"]', (doc)=>{
          assert.includes(doc, 'h3', 'public testReturnFunction2(): number');
          assert.includes(doc, '[data-ice="returnParams"] tbody tr', 'number this is return value.');
        });
      });
    });
  });
});
