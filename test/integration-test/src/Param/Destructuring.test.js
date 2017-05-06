import assert from 'assert';
import {find} from '../../util';

describe('test/Param/Destructuring:', ()=>{
  it('has array destructuring param', ()=>{
    const doc = find('longname', 'src/Param/Destructuring.js~TestParamDestructuring#methodArray');
    assert.deepEqual(doc.params, [
      {nullable: null, types: ['number[]'], spread: false, optional: false, name: 'p', description: ''},
      {nullable: null, types: ['number'], spread: false, optional: false, name: 'p[0]', description: ''},
      {nullable: null, types: ['number'], spread: false, optional: false, name: 'p[1]', description: ''}
    ]);
  });
});
