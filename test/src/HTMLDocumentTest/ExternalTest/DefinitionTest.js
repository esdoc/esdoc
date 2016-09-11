import {readDoc, assert, findParent} from './../../util.js';

/** @test {ExternalDoc#@_name} */
describe('TestExternalDefinition', ()=> {
  const doc = readDoc('index.html');

  it('has external document.', ()=> {
    findParent(doc, '[data-ice="nav"] [data-ice="doc"] a[href="http://example.com"]', '[data-ice="doc"]', (doc)=> {
      assert.includes(doc, '[data-ice="name"]', 'TestExternalDefinition');
    });
  });
});
