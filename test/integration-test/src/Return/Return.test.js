import assert from 'assert';
import {find} from '../../util';

describe('test/Return/Return:', ()=>{
  it('has return value', ()=>{
    const doc = find('longname', 'src/Return/Return.js~TestReturn#methodReturn');
    assert.deepEqual(doc.return, {
      nullable: null,
      types: ['number'],
      spread: false,
      description: 'this is return value.'
    });
  });
});
