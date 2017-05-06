import assert from 'assert';
import {find} from '../../util';

describe('test/Access/Method:', ()=>{
  it('is public', ()=>{
    const doc = find('longname', 'src/Access/Method.js~TestAccessMethod#methodPublic');
    assert.equal(doc.access, 'public');
  });

  it('is protected', ()=>{
    const doc = find('longname', 'src/Access/Method.js~TestAccessMethod#methodProtected');
    assert.equal(doc.access, 'protected');
  });

  it('is private', ()=>{
    const doc = find('longname', 'src/Access/Method.js~TestAccessMethod#methodPrivate');
    assert.equal(doc.access, 'private');
  });
});
