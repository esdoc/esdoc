import assert from 'assert';
import InvalidCodeLogger from '../../../src/Util/InvalidCodeLogger';

/** @test {InvalidCodeLogger} */
describe('test invalid code', ()=>{
  it('has invalid code log.', ()=>{
    assert.equal(InvalidCodeLogger._logs.length, 2);

    assert(InvalidCodeLogger._logs[0].filePath.includes('test/fixture/src/Invalid/CodeSyntax.js'));
    assert.deepEqual(InvalidCodeLogger._logs[0].log, [1, 2]);

    assert(InvalidCodeLogger._logs[1].filePath.includes('test/fixture/src/Invalid/DocSyntax.js'));
    assert.deepEqual(InvalidCodeLogger._logs[1].log, [1, 4]);
  });
});
