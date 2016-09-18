import {readDoc as _readDoc, assert, cli} from '../util.js';

/** @test {DocBuilder#_buildLayoutDoc} */
describe('test config.styles: ["./test/fixture/style/custom.css"]', ()=>{
  cli('./test/fixture/config/esdoc-styles.json');

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture/dest/esdoc-styles');
  }

  it('has custom style', ()=>{
    const doc = readDoc('index.html');
    assert.includes(doc, '[data-ice="userStyle"]', 'user/css/0-custom.css', 'href');
  });
});
