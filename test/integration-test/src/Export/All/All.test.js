import assert from 'assert';
import {find} from '../../../util';

describe('test/Export/All/All:', ()=>{
  it('re exported all the exports', ()=>{
    const doc1 = find('longname', 'src/Export/All/All.js~a');
    const doc2 = find('longname', 'src/Export/All/All.js~b');
    const doc3 = find('longname', 'src/Export/All/All.js~c');

    assert.equal(doc1.export, true);
    assert.equal(doc2.export, true);
    assert.equal(doc3.export, true);
  })
});
