import assert from 'assert';
import {find} from '../../../util';

describe('test/Export/NewExpression/Class:', ()=>{
  it('is exported that default export', ()=>{
    const doc = find('longname', 'src/Export/NewExpression/Class.js~testExportNewExpression1');
    assert.equal(doc.export, true);
  });

  it('is exported that named export (1)', ()=>{
    const doc = find('longname', 'src/Export/NewExpression/Class.js~testExportNewExpression2');
    assert.equal(doc.export, true);
  });

  it('is exported that named export (2)', ()=>{
    const doc = find('longname', 'src/Export/NewExpression/Class.js~testExportNewExpression3');
    assert.equal(doc.export, true);
  });

  it('is exported that named export (3)', ()=>{
    const doc = find('longname', 'src/Export/NewExpression/Class.js~testExportNewExpression4');
    assert.equal(doc.export, true);
  });
});
