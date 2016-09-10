import {assert} from '../util.js';

/** @test {ClassDoc} */
describe('ClassDoc:', ()=>{

  /** @test {ClassDoc#@extends} */
  it('can parse nested extend.', ()=>{
    const doc = global.db.find({name: 'TestExtendsNest'})[0];
    assert.equal(doc.extends.length, 1);
    assert.equal(doc.extends[0], "TestExtendsNestPackage~obj.TestExtendsNestInner");
  });
});
