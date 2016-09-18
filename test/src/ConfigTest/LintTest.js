import {assert, cli} from '../util.js';
import {_results} from '../../../src/Publisher/Builder/LintDocBuilder.js';

/** @test {publish} */
describe('test config.lint: false', ()=>{
  const invalidCount = _results.length;
  cli('./test/fixture-config/esdoc-lint.json');

  it('does not lint results when invalid code is exits', ()=>{
    assert.equal(_results.length, invalidCount);
  });
});
