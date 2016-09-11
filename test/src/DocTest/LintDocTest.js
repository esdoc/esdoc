import assert from 'assert';
import {_results} from '../../../src/Publisher/Builder/LintDocBuilder.js';

/** @test {LintDocBuilder} */
describe('TestLintInvalid', ()=>{
  it('has results', ()=>{
    assert.equal(_results.length, 4);
    assert.equal(_results[0].doc.longname, 'src/Lint/Invalid.js~TestLintInvalid#method1');
    assert.equal(_results[1].doc.longname, 'src/Lint/Invalid.js~TestLintInvalid#method2');
    assert.equal(_results[2].doc.longname, 'src/Lint/Invalid.js~TestLintInvalid#method3');
    assert.equal(_results[3].doc.longname, 'src/Lint/Invalid.js~TestLintInvalid#method4');
  });
});
