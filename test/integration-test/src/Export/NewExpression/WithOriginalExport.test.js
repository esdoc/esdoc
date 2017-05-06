import assert from 'assert';
import {find} from '../../../util';

describe('test/Export/NewExpression/WithOriginalExport', ()=>{
  it('is exported', ()=>{
    const doc = find('longname', 'src/Export/NewExpression/WithOriginalExport.js~TestExportNewExpressionWithOriginalExported');
    assert.equal(doc.export, true);
  });
});
