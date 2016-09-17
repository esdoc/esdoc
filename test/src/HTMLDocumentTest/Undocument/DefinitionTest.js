import {readDoc, assert} from './../../util.js';

/**
 * @test {DocFactory#_traverseComments}
 * @test {AbstractDoc#@desc}
 * @test {DocResolver#_resolveUndocumentIdentifier}
 */
describe('TestUndocumentDefinition', ()=> {
  const doc = readDoc('class/src/Undocument/Definition.js~TestUndocumentDefinition.html');

  it('is exist', ()=> {
    assert.includes(doc, '.self-detail [data-ice="name"]', 'TestUndocumentDefinition');
  });
});
