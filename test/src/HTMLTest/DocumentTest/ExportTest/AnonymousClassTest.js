import {readDoc, assert} from './../../../util.js';

/** @test {ClassDoc#@_name} */
describe('TestExportAnonymousClass', ()=> {
  const doc = readDoc('class/src/Export/AnonymousClass.js~AnonymousClass.html');

  describe('in self detail', ()=> {
    it('is named with anonymous.', ()=> {
      assert.includes(doc, '[data-ice="importPath"]', `import AnonymousClass from 'esdoc-test-fixture/src/Export/AnonymousClass.js'`);
      assert.includes(doc, '.self-detail [data-ice="name"]', 'AnonymousClass');
    });
  });
});
