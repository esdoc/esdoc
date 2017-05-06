import assert from 'assert';
import {find} from '../../util';

describe('test/Ignore/Ignore:', ()=>{
  it('is ignored', ()=>{
    const doc = find('longname', 'src/Ignore/Ignore.js~TestIgnoreClass');
    assert.equal(doc.ignore, true);
  });
});
