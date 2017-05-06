import assert from 'assert';
import {find} from '../../util';

describe('test/Type/Type:', ()=>{
  it('has member type', ()=>{
    const doc = find('longname', 'src/Type/Type.js~TestType#member');
    assert.deepEqual(doc.type, {
      nullable: null,
      types: ['number'],
      spread: false,
      description: null
    });
  });

  it('has variable type', ()=>{
    const doc = find('longname', 'src/Type/Type.js~testTypeVariable');
    assert.deepEqual(doc.type, {
      nullable: null,
      types: ['number'],
      spread: false,
      description: null
    });
  });
});
