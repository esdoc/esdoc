import {readDoc, assert, find} from './../../util.js';

/** @test {DocResolver#_resolveIgnore */
describe('testIgnoreVariable', ()=>{
  const doc = readDoc('variable/index.html');

  it('is not documented.', ()=>{
    assert.throws(()=> find(doc, '[data-ice="summary"] [href$="#static-variable-testIgnoreVariable"]', ()=>{}));
    assert.throws(()=> find(doc, '[id="static-variable-testIgnoreVariable"]', ()=>{}));
  });
});
