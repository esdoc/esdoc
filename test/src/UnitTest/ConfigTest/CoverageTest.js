import {readDoc as _readDoc, assert, cli, consoleLogSwitch} from '../../util.js';

/** @test {CoverageBuilder} */
describe('test config.coverage: false', ()=>{
  consoleLogSwitch(false);
  cli('./test/fixture-config/esdoc-coverage.json');
  consoleLogSwitch(true);

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-coverage');
  }

  it('does not have coverage', ()=>{
    const doc = readDoc('source.html');
    assert.throws(()=>{
      assert.includes(doc, '[data-ice="coverageBadge"]', './badge.svg', 'src');
    });
  });
});
