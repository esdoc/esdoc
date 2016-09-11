import {readDoc, assert, find} from './../../util.js';

/** @test {DocResolver#_resolveIgnore */
describe('testIgnoreFunction', ()=>{
  const doc = readDoc('function/index.html');

  it('is not documented.', ()=>{
    assert.throws(()=> find(doc, '[data-ice="summary"] [href$="#static-function-testIgnoreFunction"]', ()=>{}));
    assert.throws(()=> find(doc, '[id="static-function-testIgnoreFunction"]', ()=>{}));
  });
});
