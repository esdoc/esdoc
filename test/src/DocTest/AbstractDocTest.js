import {assert} from '../util.js';

/** @test {AbstractDoc} */
describe('AbstractDoc:', ()=> {

  /** @test {AbstractDoc#@unknown} */
  it('has unknown tag.', ()=> {
    let doc = global.db.find({name: 'MyClass1'})[0];
    assert.equal(doc.unknown.length, 1);
    assert.equal(doc.unknown[0].tagName, '@foobar');
    assert.equal(doc.unknown[0].tagValue, 'this is unknown tag.');
  });

  /** @test {AbstractDoc#@undocument} */
  it('has undocument tag.', ()=> {
    let doc;

    doc = global.db.find({name: 'method5', undocument: true})[0];
    assert.equal(doc.undocument, true);

    doc = global.db.find({name: 'method6', undocument: true})[0];
    assert.equal(doc.undocument, true);
  });
});
