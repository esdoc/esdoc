import {readDoc as _readDoc, assert, cli, consoleLogSwitch} from '../../util.js';

/** @test {DocBuilder#_buildLayoutDoc} */
describe('test config.styles: ["./test/fixture/style/custom.css"]', ()=>{
  consoleLogSwitch(false);
  cli('./test/fixture-config/esdoc-styles.json');
  consoleLogSwitch(true);

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-styles');
  }

  it('has custom style', ()=>{
    const doc = readDoc('index.html');
    assert.includes(doc, '[data-ice="userStyle"]', 'user/css/0-custom.css', 'href');
  });
});
