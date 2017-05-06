import assert from 'assert';
import {find} from '../../util';

describe('test/Property/Property:', ()=>{
  it('has property', ()=>{
    const doc = find('longname', 'src/Property/Property.js~TestProperty#methodProperty');
    assert.deepEqual(doc.properties, [
      {
        nullable: null,
        types: ['number'],
        spread: false,
        optional: false,
        name: 'x1',
        description: ''
      },
      {
        nullable: null,
        types: ['TestPropertyInner'],
        spread: false,
        optional: false,
        name: 'x2',
        description: ''
      }
    ]);
  });
});
