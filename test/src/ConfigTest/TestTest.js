import {readDoc as _readDoc, assert, cli, consoleLogSwitch} from '../util.js';

/** @test {publish} */
describe('test config.test: null', ()=>{
  consoleLogSwitch(false);
  cli('./test/fixture-config/esdoc-test.json');
  consoleLogSwitch(true);

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-test');
  }

  it('does not have test integration', ()=>{
    assert.throws(()=>{
      readDoc('test.html');
    });
  });
});
