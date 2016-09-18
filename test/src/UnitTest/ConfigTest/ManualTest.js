import {readDoc as _readDoc, assert, cli, consoleLogSwitch} from '../../util.js';

/** @test {ManualDocBuilder} */
describe('test config.manual: null', ()=>{
  consoleLogSwitch(false);
  cli('./test/fixture-config/esdoc-manual.json');
  consoleLogSwitch(true);

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-manual');
  }

  it('does not have manual.', ()=>{
    assert.throws(()=>{
      readDoc('manual/index.html');
    });
  });
});
