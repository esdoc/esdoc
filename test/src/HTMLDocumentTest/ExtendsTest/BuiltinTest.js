import {readDoc, assert, find} from './../../util.js';

/** @test {ClassDoc#@extends} */
describe('TestExtendsBuiltin', ()=> {
  const doc = readDoc('class/src/Extends/Builtin.js~TestExtendsBuiltin.html');

  it('has extends chain.', ()=> {
    find(doc, '.self-detail [data-ice="extendsChain"]', (doc)=>{
      assert.includes(doc, null, 'Array → TestExtendsBuiltin');
      assert.includes(doc, 'a', 'Array');
      assert.includes(doc, 'a', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', 'href');
    });
  });
});
