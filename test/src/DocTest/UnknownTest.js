import {assert} from '../util.js';

/** @test {AbstractDoc#@_unknown} */
describe('test unknown tag', ()=> {
  it('has unknown tag.', ()=> {
    const doc = global.db.find({name: 'TestUnknownDefinition'})[0];
    assert.equal(doc.unknown.length, 1);
    assert.equal(doc.unknown[0].tagName, '@foobar');
    assert.equal(doc.unknown[0].tagValue, 'this is unknown tag.');
  });
});
