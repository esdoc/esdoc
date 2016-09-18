import {readDoc as _readDoc, assert, cli} from '../util.js';

/** @test {CoverageBuilder} */
describe('test config.coverage: false', ()=>{
  cli('./test/fixture/config/esdoc-coverage.json');

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture/dest/esdoc-coverage');
  }

  it('does not have coverage', ()=>{
    const doc = readDoc('source.html');
    assert.throws(()=>{
      assert.includes(doc, '[data-ice="coverageBadge"]', './badge.svg', 'src');
    });
  });
});
