import assert from 'assert';

/** @test {AbstractDoc#@_unknown} */
describe('test unknown tag', ()=> {
  it('has unknown tag.', ()=> {
    const tag = global.tags.find(tag => tag.name === 'TestUnknownDefinition');
    assert.equal(tag.unknown.length, 1);
    assert.equal(tag.unknown[0].tagName, '@foobar');
    assert.equal(tag.unknown[0].tagValue, 'this is unknown tag.');
  });
});
