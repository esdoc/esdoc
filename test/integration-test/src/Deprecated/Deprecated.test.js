import assert from 'assert';
import {find} from '../../util';

describe('test/Deprecated/Deprecated', ()=>{
  it('id deprecated class', ()=>{
    const doc = find('longname', 'src/Deprecated/Deprecated.js~TestDeprecatedClass');
    assert.equal(doc.deprecated, 'this is deprecated.');
  });

  it('id deprecated member', ()=>{
    const doc = find('longname', 'src/Deprecated/Deprecated.js~TestDeprecatedClass#mDeprecated');
    assert.equal(doc.deprecated, true);
  });

  it('id deprecated method', ()=>{
    const doc = find('longname', 'src/Deprecated/Deprecated.js~TestDeprecatedClass#methodDeprecated');
    assert.equal(doc.deprecated, true);
  });

  it('id deprecated function', ()=>{
    const doc = find('longname', 'src/Deprecated/Deprecated.js~testDeprecatedFunction');
    assert.equal(doc.deprecated, true);
  });

  it('id deprecated variable', ()=>{
    const doc = find('longname', 'src/Deprecated/Deprecated.js~testDeprecatedVariable');
    assert.equal(doc.deprecated, true);
  });
});
