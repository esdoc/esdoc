import assert from 'assert';
import {find} from '../../util';

describe('src/Implements/Implements:', ()=>{
  it('implements a interface', ()=>{
    const doc = find('longname', 'src/Implements/Implements.js~TestImplementsClass');
    assert.deepEqual(doc.implements, [
      'TestInterfaceInner',
      'TestInterfaceOuter', // todo: this is bug
    ]);
  });
});
