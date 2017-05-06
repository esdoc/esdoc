import assert from 'assert';
import {find} from '../../../util';

describe('test/Export/IndirectDefault/Variable:', ()=>{
  it('is exported', ()=>{
    const doc = find('longname', 'src/Export/IndirectDefault/Variable.js~testExportIndirectDefaultVariable');
    assert.equal(doc.export, true);
  });
});
