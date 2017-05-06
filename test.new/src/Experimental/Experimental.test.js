import assert from 'assert';
import {find} from '../../util';

describe('test/Experimental/Experimental:', ()=>{
  it('has experimental with desc', ()=>{
    const doc = find('longname', 'src/Experimental/Experimental.js~TestExperimental');
    assert.equal(doc.experimental, 'this is experimental');
  });

  it('has experimental without desc', ()=>{
    const doc = find('longname', 'src/Experimental/Experimental.js~TestExperimental#methodExperimental');
    assert.equal(doc.experimental, true);
  });
});
