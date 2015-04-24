import {readDoc, assert, find} from './util.js';

describe('README:', ()=> {
  let doc = readDoc('index.html');

  it('has README.md', ()=>{
    assert.includes(doc, '[data-ice="readme"]', 'this is ESDoc Test Fixture README.');
  });

  it('has coverage badge', ()=>{
    assert.includes(doc, '.esdoc-coverage .esdoc-coverage-ratio', '100%');
  });
});
