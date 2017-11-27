import assert from 'assert';
import {find} from '../../util';

describe('test/Access/Class:', ()=>{
  it('is public', ()=>{
    const doc = find('longname', 'src/Access/Class.js~TestAccessClassPublic');
    assert.equal(doc.access, 'public');
  });

  it('is protected', ()=>{
    const doc = find('longname', 'src/Access/Class.js~TestAccessClassProtected');
    assert.equal(doc.access, 'protected');
  });

  it('is package', ()=>{
    const doc = find('longname', 'src/Access/Class.js~TestAccessClassPackage');
    assert.equal(doc.access, 'package');
  });

  it('is private', ()=>{
    const doc = find('longname', 'src/Access/Class.js~TestAccessClassPrivate');
    assert.equal(doc.access, 'private');
  });
});
