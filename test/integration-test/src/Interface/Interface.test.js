import assert from 'assert';
import {find} from '../../util';

describe('test/Interface/Interface:', ()=>{
  it('is interface', ()=>{
    const doc = find('longname', 'src/Interface/Interface.js~TestInterfaceClass');
    assert.equal(doc.interface, true);
  });
});
