import assert from 'assert';
import {find} from '../../util';

describe('test/Access/Function:', ()=>{
  it('is public', ()=>{
    const doc = find('longname', 'src/Access/Function.js~testAccessFunctionPublic');
    assert.equal(doc.access, 'public');
  });

  it('is protected', ()=>{
    const doc = find('longname', 'src/Access/Function.js~testAccessFunctionProtected');
    assert.equal(doc.access, 'protected');
  });

  it('is package', ()=>{
    const doc = find('longname', 'src/Access/Function.js~testAccessFunctionPackage');
    assert.equal(doc.access, 'package');
  });

  it('is private', ()=>{
    const doc = find('longname', 'src/Access/Function.js~testAccessFunctionPrivate');
    assert.equal(doc.access, 'private');
  });
});
