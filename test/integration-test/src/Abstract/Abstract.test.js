import assert from 'assert';
import {find} from '../../util';

describe('test/Abstract/Abstract', ()=>{
  it('is abstract', ()=>{
    const doc = find('longname', 'src/Abstract/Abstract.js~TestAbstract#methodAbstract');
    assert.equal(doc.abstract, true);
  });
});
