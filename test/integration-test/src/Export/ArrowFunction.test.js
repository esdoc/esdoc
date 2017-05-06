import assert from 'assert';
import {find} from '../../util';

describe('test/Export/ArrowFunction:', ()=>{
  it('is exported that default export', ()=>{
    const doc = find('longname', 'src/Export/ArrowFunction.js~ArrowFunction');
    assert.equal(doc.export, true);
  });

  it('is exported that named export', ()=>{
    const doc = find('longname', 'src/Export/ArrowFunction.js~testExportArrowFunction2');
    assert.equal(doc.export, true);
  });

  it('is not exported that no export', ()=>{
    const doc = find('longname', 'src/Export/ArrowFunction.js~testExportArrowFunction3');
    assert.equal(doc.export, false);
  });

  it('is exported that indirect', ()=>{
    const doc = find('longname', 'src/Export/ArrowFunction.js~testExportArrowFunction4');
    assert.equal(doc.export, true);
  });

  it('is exported that multiple named export', ()=>{
    const doc1 = find('longname', 'src/Export/ArrowFunction.js~testExportArrowFunction5');
    const doc2 = find('longname', 'src/Export/ArrowFunction.js~testExportArrowFunction6');

    assert.equal(doc1.export, true);
    assert.equal(doc2.export, true);
  });
});
