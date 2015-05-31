import {assert} from '../util.js';

/** @test {ClassDoc} */
describe('ClassDoc:', ()=>{

  /** @test {ClassDoc#@extends} */
  it('can parse nested extend.', ()=>{
    let doc = global.db.find({name: 'MyKiloClass'})[0];
    assert.equal(doc.extends.length, 1);
    assert.equal(doc.extends[0], "tera~TeraClass.GigaClass.MegaClass");
  });
});
