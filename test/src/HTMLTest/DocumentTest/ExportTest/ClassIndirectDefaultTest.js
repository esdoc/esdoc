import {readDoc, assert} from './../../../util.js';

/**
 * @test {AbstractDoc#@_export}
 * @test {ClassDocBuilder@_buildClassDoc}
 */
describe('test export class indirect default', ()=> {
  it('has default import path with indirect class definition.', ()=> {
    const doc = readDoc('class/src/Export/ClassIndirectDefault.js~TestExportClassIndirectDefault.html');
    assert.includes(doc, '.header-notice [data-ice="importPath"]', `import TestExportClassIndirectDefault from 'esdoc-test-fixture/src/Export/ClassIndirectDefault.js'`);
  });
});
