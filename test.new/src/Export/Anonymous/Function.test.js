import assert from 'assert';
import {find} from '../../../util';

describe('test/Export/Anonymous/function:', ()=>{
  it('is exported', ()=>{
    const doc = find('longname', 'src/Export/Anonymous/Function.js~Function');
    assert.equal(doc.export, true);
  });
});
