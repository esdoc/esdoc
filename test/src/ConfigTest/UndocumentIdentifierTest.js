import {readDoc as _readDoc, assert, cli, consoleLogSwitch} from '../util.js';

/** @test {DocResolver#_resolveUndocumentIdentifier} */
describe('test config.undocumentIdentifier: false', ()=>{
  consoleLogSwitch(false);
  cli('./test/fixture-config/esdoc-undocumentIdentifier.json');
  consoleLogSwitch(true);

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-undocumentIdentifier');
  }

  it('does not have undocument identifier', ()=>{
    assert.throws(()=>{
      readDoc('class/src/Undocument/Definition.js~TestUndocumentDefinition.html');
    });
  });
});
