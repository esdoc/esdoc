import assert from 'assert';
import {_results} from '../../../src/Publisher/Builder/LintDocBuilder.js';

/** @test {LintDocBuilder} */
describe('Lint:', ()=>{
  it('has results', ()=>{
    // method
    assert.equal(_results[0].doc.longname, 'src/Z003_MyInvalidLintClass.js~Z003_MyInvalidLintClass#method1');
    assert.equal(_results[1].doc.longname, 'src/Z003_MyInvalidLintClass.js~Z003_MyInvalidLintClass#method2');
    assert.equal(_results[2].doc.longname, 'src/Z003_MyInvalidLintClass.js~Z003_MyInvalidLintClass#method3');
    assert.equal(_results[3].doc.longname, 'src/Z003_MyInvalidLintClass.js~Z003_MyInvalidLintClass#method4');
  });
});
