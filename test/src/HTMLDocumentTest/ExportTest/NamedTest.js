import {readDoc, assert} from './../../util.js';

/**
 * @test {AbstractDoc#@_export}
 * @test {ClassDocBuilder@_buildClassDoc}
 */
describe('TestExportNamed', ()=> {
  it('has named import path.', ()=>{
    const doc = readDoc('class/src/Export/Named.js~TestExportNamed.html');
    assert.includes(doc, '.header-notice [data-ice="importPath"]', `import {TestExportNamed} from 'esdoc-test-fixture/src/Export/Named.js'`);
  });
});
