import {readDoc, assert, find} from './../util.js';

/** @testTarget {IndexDocBuilder} */
describe('Index:', ()=> {
  let doc = readDoc('index.html');

  /** @testTarget {IndexDocBuilder#_buildIndexDoc} */
  it('has README.md', ()=>{
    assert.includes(doc, '[data-ice="index"]', 'this is ESDoc Test Fixture README.');
  });

  /** @testTarget {IndexDocBuilder#_buildIndexDoc} */
  it('has coverage badge', ()=>{
    assert.includes(doc, '.esdoc-coverage .esdoc-coverage-ratio', '81%');
  });
});
