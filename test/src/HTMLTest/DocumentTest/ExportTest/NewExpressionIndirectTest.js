import {readDoc, assert, find, findParent} from './../../../util.js';

/**
 * @test {DocFactory#_inspectExportDefaultDeclaration}
 * @test {DocFactory#_inspectExportNamedDeclaration}
 */
describe('test default export with new expression.', ()=> {
  it('has instance description', ()=> {
    const doc = readDoc('class/src/Export/NewExpression.js~TestExportNewExpression.html');

    find(doc, '[data-ice="instanceDocs"]', (doc)=>{
      assert.includes(doc, null, 'You can directly use an instance of this class. testExportNewExpression');
      assert.includes(doc, 'a', 'testExportNewExpression');
      assert.includes(doc, 'a', 'variable/index.html#static-variable-testExportNewExpression', 'href');
    });

    // does not have import path because the class is not clear exported.
    try {
      assert.includes(doc, '.header-notice [data-ice="importPath"]', 'import');
    } catch(e) {
      return;
    }
    assert(false);
  });

  it('has class description', ()=>{
    const doc = readDoc('variable/index.html');

    findParent(doc, '[data-ice="summary"] [href$="#static-variable-testExportNewExpression"]', '[data-ice="target"]', (doc)=>{
      assert.includes(doc, null, 'public testExportNewExpression: TestExportNewExpression');
    });

    findParent(doc, '#static-variable-testExportNewExpression', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, 'h3', 'public testExportNewExpression: TestExportNewExpression');
      assert.includes(doc, '[data-ice="importPath"]', `import testExportNewExpression from 'esdoc-test-fixture/src/Export/NewExpression.js'`);
    });
  });
});
