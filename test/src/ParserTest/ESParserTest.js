import assert from 'assert';
import ESParser from '../../../src/Parser/ESParser.js';

/** @test {ESParser} */
describe('ESParser', ()=>{
  it('can parse "Class"', ()=>{
    const ast = ESParser.parse({}, './test/fixture/package/src/Class/Definition.js');
    assert(ast.program.sourceType === 'module');
  });

  // todo: enhance test patterns.
});
