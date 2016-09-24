import {readDoc, assert, find} from './../../../util.js';

/**
 * @test {ClassDoc#@extends}
 * @test {DocResolver@_resolveNecessary}
 */
describe('TestExtendsInner', ()=> {
  it('has extends chain.', ()=>{
    const doc = readDoc('class/src/Extends/Inner.js~TestExtendsInner.html');
    find(doc, '.self-detail [data-ice="extendsChain"]', (doc)=>{
      assert.includes(doc, null, '_TestExtendsInner → TestExtendsInner');
      assert.includes(doc, 'a[href$="_TestExtendsInner.html"]', '_TestExtendsInner');
    });
  });

  it('has direct subclass.', ()=>{
    const doc = readDoc('class/src/Extends/Inner.js~_TestExtendsInner.html');
    find(doc, '.self-detail [data-ice="directSubclass"]', (doc)=>{
      assert.includes(doc, 'a[href="class/src/Extends/Inner.js~TestExtendsInner.html"]', 'TestExtendsInner');
    });
  });
});
