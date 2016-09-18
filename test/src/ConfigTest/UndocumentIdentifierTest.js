import {readDoc as _readDoc, assert, cli} from '../util.js';

/** @test {DocResolver#_resolveUndocumentIdentifier} */
describe('test config.undocumentIdentifier: false', ()=>{
  cli('./test/fixture-config/esdoc-undocumentIdentifier.json');

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-undocumentIdentifier');
  }

  it('does not have undocument identifier', ()=>{
    assert.throws(()=>{
      readDoc('class/src/Undocument/Definition.js~TestUndocumentDefinition.html');
    });
  });
});
