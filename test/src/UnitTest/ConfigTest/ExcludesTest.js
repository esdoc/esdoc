import {readDoc as _readDoc, assert, cli, consoleLogSwitch} from '../../util.js';

/** @test {ESDoc.generate} */
describe('test config.excludes: ["Class\\.js"]', ()=>{
  consoleLogSwitch(false);
  cli('./test/fixture-config/esdoc-excludes.json');
  consoleLogSwitch(true);

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-excludes');
  }

  it('does not have excluded identifier', ()=>{
    assert.throws(()=>{
      readDoc('class/src/Desc/Class.js~TestDescClass.html');
    });
  });
});
