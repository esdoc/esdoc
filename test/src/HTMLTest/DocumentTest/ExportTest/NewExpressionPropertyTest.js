import {readDoc, assert, find, findParent} from './../../../util.js';

/**
 * @test {DocFactory#_inspectExportDefaultDeclaration}
 * @test {DocFactory#_inspectExportNamedDeclaration}
 */
describe('test default export with new expression and property.', ()=> {
  it('has instance description', ()=> {
    const doc = readDoc('class/src/Export/NewExpressionProperty.js~TestExportNewExpressionProperty.html');

    find(doc, '[data-ice="instanceDocs"]', (doc)=>{
      assert.includes(doc, null, 'You can directly use an instance of this class. testExportNewExpressionProperty');
      assert.includes(doc, 'a', 'testExportNewExpressionProperty');
      assert.includes(doc, 'a', 'variable/index.html#static-variable-testExportNewExpressionProperty', 'href');
    });

    // does not have import path because the class is not clear exported.
    try {
      assert.includes(doc, '.header-notice [data-ice="importPath"]', 'import');
    } catch (e) {
      return;
    }
    assert(false);
  });

  it('has class description', ()=>{
    const doc = readDoc('variable/index.html');

    findParent(doc, '[data-ice="summary"] [href$="#static-variable-testExportNewExpressionProperty"]', '[data-ice="target"]', (doc)=>{
      assert.includes(doc, null, 'public testExportNewExpressionProperty: TestExportNewExpressionProperty');
    });

    findParent(doc, '#static-variable-testExportNewExpressionProperty', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, 'h3', 'public testExportNewExpressionProperty: TestExportNewExpressionProperty');
      assert.includes(doc, '[data-ice="importPath"]', `import testExportNewExpressionProperty from 'esdoc-test-fixture/src/Export/NewExpressionProperty.js'`);
    });
  });
});
