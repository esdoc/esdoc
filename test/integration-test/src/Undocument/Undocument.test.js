import assert from 'assert';
import {find} from '../../util';

describe('test/Undocument/Undocument:', ()=>{
  it('has undocument', ()=>{
    const doc = find('longname', 'src/Undocument/Undocument.js~TestUndocument');
    assert.deepEqual(doc.undocument, true);
  });
});
