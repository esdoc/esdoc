import assert from 'assert';
import {find} from '../../util';

describe('test/Emits/Emits:', ()=>{
  it('has emits from method', ()=>{
    const doc = find('longname', 'src/Emits/Emits.js~TestEmitsClass#methodEmits');
    assert.deepEqual(doc.emits, [
      {
        types: ["TestEmitsEvent1"],
        "description": "emits event when foo."
      },
      {
        types: ["TestEmitsEvent2"],
        "description": "emits event when bar."
      }
    ]);
  });

  it('has emits from function', ()=>{
    const doc = find('longname', 'src/Emits/Emits.js~testEmitsFunction');
    assert.deepEqual(doc.emits, [
      {
        types: ["TestEmitsEvent1"],
        "description": ""
      },
    ]);
  });
});
