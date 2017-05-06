import assert from 'assert';
import {find} from '../../util';

describe('test/Unknown/Unknown:', ()=>{
  it('has unknown', ()=>{
    const doc = find('longname', 'src/Unknown/Unknown.js~TestUnknown');
    assert.deepEqual(doc.unknown, [{tagName: '@foobar', tagValue: 'this is unknown tag.'}]);
  });
});
