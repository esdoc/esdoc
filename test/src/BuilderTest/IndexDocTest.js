import {readDoc, assert, find} from './../util.js';

/** @test {IndexDocBuilder} */
describe('Index:', ()=> {
  let doc = readDoc('index.html');

  /** @test {IndexDocBuilder#_buildIndexDoc} */
  it('has README.md', ()=>{
    assert.includes(doc, '[data-ice="index"]', 'this is ESDoc Test Fixture README.');
  });

  /** @test {IndexDocBuilder#_buildIndexDoc} */
  it('has coverage badge', ()=>{
    assert.includes(doc, '.esdoc-coverage .esdoc-coverage-ratio', '79%');
  });
});
