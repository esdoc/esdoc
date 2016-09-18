import {readDoc as _readDoc, assert, cli} from '../util.js';

/** @test {ManualDocBuilder} */
describe('test config.manual: null', ()=>{
  cli('./test/fixture/config/esdoc-manual.json');

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture/dest/esdoc-manual');
  }

  it('does not have manual.', ()=>{
    assert.throws(()=>{
      readDoc('manual/index.html');
    });
  });
});
