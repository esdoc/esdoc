import assert from 'assert';
import {find} from '../../util';

describe('test/Param/Param:', ()=>{
  it('has param', ()=>{
    const doc = find('longname', 'src/Param/Param.js~TestParam#method');
    assert.equal(doc.params.length, 1);
    assert.deepEqual(doc.params[0].types, ['number']);
    assert.equal(doc.params[0].name, 'p1');
    assert.equal(doc.params[0].description, 'this is p1');
  });
});
