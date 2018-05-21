import assert from 'assert';
import {find} from '../../../util';

describe('test/Export/Reexport/Reexport:', ()=>{
  it('re exported all the exports', ()=>{
    const doc1 = find('longname', 'src/Export/Reexport/Reexport.js~a');
    const doc2 = find('longname', 'src/Export/Reexport/Reexport.js~b');
    const doc3 = find('longname', 'src/Export/Reexport/Reexport.js~c');
    const doc4 = find('longname', 'src/Export/Reexport/Reexport.js~d');

    assert.equal(doc1.export, true);
    assert.equal(doc2.export, true);
    assert.equal(doc3.export, true);
    assert.equal(doc4.export, true);
  })
});
