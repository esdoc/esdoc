import assert from 'assert';
import {find} from '../../../util';

describe('test/Export/IndirectDefault/Class:', ()=>{
  it('is exported', ()=>{
    const doc = find('longname', 'src/Export/IndirectDefault/Class.js~TestExportIndirectDefaultClass');
    assert.equal(doc.export, true);
  });
});
