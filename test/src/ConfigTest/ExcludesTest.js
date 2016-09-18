import {readDoc as _readDoc, assert, cli} from '../util.js';

/** @test {ESDoc.generate} */
describe('test config.excludes: ["Class\\.js"]', ()=>{
  cli('./test/fixture-config/esdoc-excludes.json');

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-excludes');
  }

  it('does not have excluded identifier', ()=>{
    assert.throws(()=>{
      readDoc('class/src/Desc/Class.js~TestDescClass.html');
    });
  });
});
