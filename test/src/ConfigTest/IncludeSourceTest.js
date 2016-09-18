import {readDoc as _readDoc, assert, cli} from '../util.js';

/** @test {publish} */
describe('test config.includeSource: false', ()=>{
  cli('./test/fixture/config/esdoc-includeSource.json');

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture/dest/esdoc-includeSource');
  }

  it('does not have source code.', ()=>{
    const doc = readDoc('file/src/Desc/Class.js.html');
    assert.includes(doc, '[data-ice="content"]', 'src/Desc/Class.js');
    assert.includes(doc, '[data-ice="content"]', 'Sorry, this documentation does not provide source code.');
    assert.notIncludes(doc, '[data-ice="content"]', 'class TestDescClass');
  });
});
