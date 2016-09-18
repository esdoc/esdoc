import {readDoc, assert, cli, consoleLogSwitch} from '../../util.js';

/** @test {publish} */
describe('test config.includeSource:', ()=>{
  it('use esdoc-non-source.json without error', ()=>{
    consoleLogSwitch(false);
    cli('./test/fixture/esdoc-non-source.json');
    consoleLogSwitch(true);
  });

  it('doest not include source code.', ()=>{
    const doc = readDoc('file/src/Desc/Class.js.html', './test/fixture/esdoc-non-source');
    assert.includes(doc, '[data-ice="content"]', 'src/Desc/Class.js');
    assert.includes(doc, '[data-ice="content"]', 'Sorry, this documentation does not provide source code.');
    assert.notIncludes(doc, '[data-ice="content"]', 'class TestDescClass');
  });
});
