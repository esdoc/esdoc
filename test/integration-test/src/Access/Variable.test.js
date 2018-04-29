import assert from 'assert';
import {find} from '../../util';

describe('test/Access/Variable:', ()=>{
  it('is public', ()=>{
    const doc = find('longname', 'src/Access/Variable.js~testAccessVariablePublic');
    assert.equal(doc.access, 'public');
  });

  it('is protected', ()=>{
    const doc = find('longname', 'src/Access/Variable.js~testAccessVariableProtected');
    assert.equal(doc.access, 'protected');
  });

  it('is package', ()=>{
    const doc = find('longname', 'src/Access/Variable.js~testAccessVariablePackage');
    assert.equal(doc.access, 'package');
  });

  it('is private', ()=>{
    const doc = find('longname', 'src/Access/Variable.js~testAccessVariablePrivate');
    assert.equal(doc.access, 'private');
  });
});
