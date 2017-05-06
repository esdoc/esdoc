import assert from 'assert';
import {find} from '../../util';

describe('test/Export/Class:', ()=>{
  it('is exported that default export', () =>{
    const doc = find('longname', 'src/Export/Class.js~TestExportClass1');
    assert.equal(doc.export, true);
  });

  it('is exported that named export', () =>{
    const doc = find('longname', 'src/Export/Class.js~TestExportClass2');
    assert.equal(doc.export, true);
  });

  it('is exported that indirect with declaration', () =>{
    const doc = find('longname', 'src/Export/Class.js~TestExportClass3');
    assert.equal(doc.export, true);
  });

  it('is exported that indirect with expression', () =>{
    const doc = find('longname', 'src/Export/Class.js~TestExportClass4');
    assert.equal(doc.export, true);
  });

  it('is not exported that non export', () =>{
    const doc = find('longname', 'src/Export/Class.js~TestExportClass5');
    assert.equal(doc.export, false);
  });

  it('is exported that multiple named export', ()=>{
    const [doc1, doc2] = find('longname',
      'src/Export/Class.js~TestExportClass6',
      'src/Export/Class.js~TestExportClass7'
    );

    assert.equal(doc1.export, true);
    assert.equal(doc2.export, true);
  });
});
