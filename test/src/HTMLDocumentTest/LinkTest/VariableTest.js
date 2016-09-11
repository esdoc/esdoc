import {readDoc, assert, findParent} from './../../util.js';

/** @test {DocResolver#_resolveLink} */
describe('testLinkVariable', ()=> {
  const doc = readDoc('variable/index.html');

  it('has link.', ()=>{
    findParent(doc, '[id="static-variable-testLinkVariable"]', '[data-ice="detail"]', (doc)=> {
      assert.includes(doc, '[data-ice="description"] a[href="class/src/Link/Class.js~TestLinkClass.html"]', 'TestLinkClass');
    });
  });
});
