import {readDoc, assert, find} from './../util.js';

/**
 * @test {DocFactory#_inspectExportDefaultDeclaration}
 * @test {DocFactory#_inspectExportNamedDeclaration}
 */
describe('Export:', ()=>{
  describe('MyExport1:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport1.html');

    it('has instance notice.', ()=>{
      assert.includes(doc, '[data-ice="importPath"]', "import MyExport1 from 'esdoc-test-fixture/src/Export.js'");
      //assert.includes(doc, '.self-detail', 'You can directly use an instance of this class. myExport1');
    });
  });

  describe('MyExport2:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport2.html');

    it('has instance notice.', ()=>{
      assert.notIncludes(doc, '[data-ice="importPath"]', "esdoc-test-fixture/src/Export.js");
      assert.includes(doc, '.self-detail', 'You can directly use an instance of this class. myExport2');
    });
  });

  describe('MyExport3:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport3.html');

    it('has instance notice.', ()=>{
      assert.notIncludes(doc, '[data-ice="importPath"]', "esdoc-test-fixture/src/Export.js");
      assert.includes(doc, '.self-detail', 'You can directly use instance of this class. myExport3');
    });
  });

  describe('MyExport4:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport4.html');

    it('has instance notice.', ()=>{
      assert.notIncludes(doc, '[data-ice="importPath"]', "esdoc-test-fixture/src/Export.js");
      assert.includes(doc, '.self-detail', 'You can directly use instance of this class. myExport4');
    });
  });

  describe('MyExport5:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport5.html');

    it('has instance notice.', ()=>{
      assert.notIncludes(doc, '[data-ice="importPath"]', "esdoc-test-fixture/src/Export.js");
      assert.includes(doc, '.self-detail', 'You can directly use instance of this class. myExport5');
    });
  });

  describe('MyExport6:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport6.html');

    it('does not have instance notice.', ()=>{
      assert.includes(doc, '[data-ice="importPath"]', "import {MyExport6} from 'esdoc-test-fixture/src/Export.js'");
      assert.notIncludes(doc, '.self-detail', 'You can directly use instance of this class.');
    });
  });

  describe('MyExport9:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport9.html');

    it('has instance notice.', ()=>{
      assert.notIncludes(doc, '[data-ice="importPath"]', "esdoc-test-fixture/src/Export.js");
      assert.notIncludes(doc, '.self-detail', 'You can directly use instance of this class.');
    });
  });

  describe('MyExport99:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport99.html');

    it('does not have instance notice.', ()=>{
      assert.includes(doc, '[data-ice="importPath"]', "import {MyExport99} from 'esdoc-test-fixture/src/Export.js'");
      assert.notIncludes(doc, '.self-detail', 'You can directly use instance of this class.');
    });
  });
});


