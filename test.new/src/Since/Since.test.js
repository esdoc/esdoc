import assert from 'assert';
import {find} from '../../util';

describe('test/Since/Since:', ()=>{
  it('has a since version', ()=>{
    const doc = find('longname', 'src/Since/Since.js~TestSince');
    assert.deepEqual(doc.since, '1.2.3');
  });
});
