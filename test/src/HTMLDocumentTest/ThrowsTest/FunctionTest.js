import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@throws} */
describe('testThrowsFunction', ()=> {
  const doc = readDoc('function/index.html');

  it('has throws.', ()=>{
    findParent(doc, '[id="static-function-testThrowsFunction"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="throw"] a[href="class/src/Throws/Function.js~TestThrowsFunctionError.html"]', 'TestThrowsFunctionError');
    });
  });
});
