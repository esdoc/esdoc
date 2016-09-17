import {assert} from '../util.js';

/**
 * @test {DocFactory#_traverseComments}
 * @test {AbstractDoc#@desc}
 * @test {DocResolver#_resolveUndocumentIdentifier}
 */
describe('test undocument', ()=> {
  it('has undocument tag.', ()=> {
    const doc = global.db.find({name: 'TestUndocumentDefinition', undocument: true})[0];
    assert.equal(doc.undocument, true);
  });
});
