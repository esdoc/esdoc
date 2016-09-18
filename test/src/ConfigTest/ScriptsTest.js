import {readDoc as _readDoc, assert, cli} from '../util.js';

/** @test {DocBuilder#_buildLayoutDoc} */
describe('test config.scripts: ["./test/fixture/script/custom.js"]', ()=>{
  cli('./test/fixture/config/esdoc-scripts.json');

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture/dest/esdoc-scripts');
  }

  it('has custom script', ()=>{
    const doc = readDoc('index.html');
    assert.includes(doc, '[data-ice="userScript"]', 'user/script/0-custom.js', 'src');
  });
});
