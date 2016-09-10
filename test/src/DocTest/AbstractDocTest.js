import {assert} from '../util.js';

/** @test {AbstractDoc} */
describe('AbstractDoc:', ()=> {

  /** @test {AbstractDoc#@_unknown} */
  it('has unknown tag.', ()=> {
    const doc = global.db.find({name: 'TestUnknownDefinition'})[0];
    assert.equal(doc.unknown.length, 1);
    assert.equal(doc.unknown[0].tagName, '@foobar');
    assert.equal(doc.unknown[0].tagValue, 'this is unknown tag.');
  });

  /** @test {AbstractDoc#@_undocument} */
  it('has undocument tag.', ()=> {
    const doc = global.db.find({name: 'TestUndocumentDefinition', undocument: true})[0];
    assert.equal(doc.undocument, true);
  });
});
