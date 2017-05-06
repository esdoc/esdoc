import assert from 'assert';
import {find} from '../../../util';

describe('test/Export/NewExpression/WithObjectProperty:', ()=>{
  it('is exported', ()=>{
    const doc = find('longname', 'src/Export/NewExpression/WithObjectProperty.js~TestExportNewExpressionProperty');
    assert.equal(doc.export, true);
  });
});
