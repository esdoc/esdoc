import {readDoc, assert, find} from './../util.js';

/**
 * @test {DocFactory#_inspectExportDefaultDeclaration}
 * @test {DocFactory#_inspectExportNamedDeclaration}
 */
describe('Export:', ()=>{
  describe('MyExport1:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport1.html');

    it('does not have instance notice.', ()=>{
      assert.includes(doc, '[data-ice="importPath"]', "import MyExport1 from 'esdoc-test-fixture/out/src/Export.js'");
      assert.notIncludes(doc, '.self-detail', 'This class has been exported at instantiated state.');
    });
  });

  describe('MyExport2:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport2.html');

    it('has instance notice.', ()=>{
      assert.includes(doc, '[data-ice="importPath"]', "import MyExport2 from 'esdoc-test-fixture/out/src/Export.js'");
      assert.includes(doc, '.self-detail', 'This class has been exported at instantiated state.');
    });
  });

  describe('MyExport3:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport3.html');

    it('has instance notice.', ()=>{
      assert.includes(doc, '[data-ice="importPath"]', "import myExport3 from 'esdoc-test-fixture/out/src/Export.js'");
      assert.includes(doc, '.self-detail', 'This class has been exported at instantiated state.');
    });
  });

  describe('MyExport4:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport4.html');

    it('has instance notice.', ()=>{
      assert.includes(doc, '[data-ice="importPath"]', "import {myExport4} from 'esdoc-test-fixture/out/src/Export.js'");
      assert.includes(doc, '.self-detail', 'This class has been exported at instantiated state.');
    });
  });

  describe('MyExport5:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport5.html');

    it('has instance notice.', ()=>{
      assert.includes(doc, '[data-ice="importPath"]', "import {myExport5} from 'esdoc-test-fixture/out/src/Export.js'");
      assert.includes(doc, '.self-detail', 'This class has been exported at instantiated state.');
    });
  });

  describe('MyExport6:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport6.html');

    it('does not have instance notice.', ()=>{
      assert.includes(doc, '[data-ice="importPath"]', "import {MyExport6} from 'esdoc-test-fixture/out/src/Export.js'");
      assert.notIncludes(doc, '.self-detail', 'This class has been exported at instantiated state.');
    });
  });

  describe('MyExport9:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport9.html');

    it('does not have instance notice.', ()=>{
      assert.notIncludes(doc, '.self-detail', 'This class has been exported at instantiated state.');
    });
  });

  describe('MyExport99:', ()=>{
    let doc = readDoc('class/src/Export.js~MyExport99.html');

    it('does not have instance notice.', ()=>{
      assert.includes(doc, '[data-ice="importPath"]', "import {MyExport99} from 'esdoc-test-fixture/out/src/Export.js'");
      assert.notIncludes(doc, '.self-detail', 'This class has been exported at instantiated state.');
    });
  });
});


