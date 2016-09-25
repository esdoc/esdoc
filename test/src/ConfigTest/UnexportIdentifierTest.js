import {readDoc as _readDoc, assert, cli} from '../util.js';

/** @test {DocResolver#_resolveUnexportIdentifier} */
describe('test config.unexportIdentifier: true', ()=>{
  cli('./test/fixture/config/esdoc-unexportIdentifier.json');

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture/dest/esdoc-unexportIdentifier');
  }

  it('has unexport identifier', ()=>{
    const doc = readDoc('class/src/Export/Class.js~TestExportClass6.html');
    assert.includes(doc, '.self-detail [data-ice="name"]', 'TestExportClass6');
    assert.notIncludes(doc, '.header-notice', 'import');
  });
});
