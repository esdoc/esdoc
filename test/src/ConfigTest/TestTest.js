import {readDoc as _readDoc, assert, cli} from '../util.js';

/** @test {publish} */
describe('test config.test: null', ()=>{
  cli('./test/fixture-config/esdoc-test.json');

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-test');
  }

  it('does not have test integration', ()=>{
    assert.throws(()=>{
      readDoc('test.html');
    });
  });
});
