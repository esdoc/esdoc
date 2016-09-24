import {readDoc, assert, find, findParent} from './../../../util.js';

/**
 * @test {DocFactory#_inspectExportDefaultDeclaration}
 * @test {DocFactory#_inspectExportNamedDeclaration}
 */
describe('test default export with new expression and indirect.', ()=> {
  it('has instance description', ()=> {
    const doc = readDoc('class/src/Export/NewExpressionIndirect.js~TestExportNewExpressionIndirect.html');

    find(doc, '[data-ice="instanceDocs"]', (doc)=>{
      assert.includes(doc, null, 'You can directly use an instance of this class. testExportNewExpressionIndirect');
      assert.includes(doc, 'a', 'testExportNewExpressionIndirect');
      assert.includes(doc, 'a', 'variable/index.html#static-variable-testExportNewExpressionIndirect', 'href');
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

    findParent(doc, '[data-ice="summary"] [href$="#static-variable-testExportNewExpressionIndirect"]', '[data-ice="target"]', (doc)=>{
      assert.includes(doc, null, 'public testExportNewExpressionIndirect: TestExportNewExpressionIndirect');
    });

    findParent(doc, '#static-variable-testExportNewExpressionIndirect', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, 'h3', 'public testExportNewExpressionIndirect: TestExportNewExpressionIndirect');
      assert.includes(doc, '[data-ice="importPath"]', `import testExportNewExpressionIndirect from 'esdoc-test-fixture/src/Export/NewExpressionIndirect.js'`);
    });
  });
});
