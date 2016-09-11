import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@see} */
describe('testSeeVariable', ()=> {
  const doc = readDoc('variable/index.html');

  it('has see.', ()=>{
    findParent(doc, '[id="static-variable-testSeeVariable"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="see"] a[href="http://example.com"]', 'http://example.com');
    });
  });
});
