import {readDoc, assert, find} from './../../util.js';

/** @test {ClassDoc#@extends} */
describe('TestExtendsProperty', ()=> {
  const doc = readDoc('class/src/Extends/Property.js~TestExtendsProperty.html');

  it('has extends chain.', ()=> {
    find(doc, '.self-detail [data-ice="extendsChain"]', (doc)=>{
      assert.includes(doc, null, 'TestExtendsPropertyPackage~obj.TestExtendsPropertyInner → TestExtendsProperty');
    });
  });
});
