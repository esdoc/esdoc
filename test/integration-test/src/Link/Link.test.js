import assert from 'assert';
import {find} from '../../util';

describe('test/Link/Link:', ()=>{
  it('has link', ()=>{
    const doc = find('longname', 'src/Link/Link.js~TestLinkClass');
    assert.equal(doc.description, '{@link TestLinkClass}');
  });
});
