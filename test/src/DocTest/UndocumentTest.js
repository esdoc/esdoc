import assert from 'assert';

/**
 * @test {DocFactory#_traverseComments}
 * @test {AbstractDoc#@desc}
 * @test {DocResolver#_resolveUndocumentIdentifier}
 */
describe('test undocument', ()=> {
  it('has undocument tag.', ()=> {
    const tag = global.tags.find(tag => tag.name === 'TestUndocumentDefinition');
    assert.equal(tag.undocument, true);
  });
});
