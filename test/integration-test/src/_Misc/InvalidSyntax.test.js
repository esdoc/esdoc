import assert from 'assert';
import InvalidCodeLogger from '../../../../src/Util/InvalidCodeLogger';

describe('test/_Misc/InvalidSyntax:', ()=>{
  it('is invalid', ()=>{
    assert.equal(InvalidCodeLogger._logs.length, 2);

    assert(InvalidCodeLogger._logs[0].filePath.includes('test/integration-test/src/_Misc/InvalidSyntaxCode.js'));
    assert.deepEqual(InvalidCodeLogger._logs[0].log, [1, 2]);

    assert(InvalidCodeLogger._logs[1].filePath.includes('test/integration-test/src/_Misc/InvalidSyntaxDoc.js'));
    assert.deepEqual(InvalidCodeLogger._logs[1].log, [1, 4]);
  });
});
