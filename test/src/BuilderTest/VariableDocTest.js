import {readDoc, assert, find} from './../util.js';

/** @test {SingleDocBuilder} */
describe('MyVariable:', ()=> {
  let doc = readDoc('variable/index.html');

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has summary.', ()=>{
    find(doc, '[data-ice="summary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public myExport1: MyExport1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public myExport10: MyExport10');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public myExport2: MyExport2');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public myExport3: MyExport3');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public myExport4: MyExport4');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(6)', 'public myExport5: MyExport5');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(7)', 'public myVariable1: Object this is myVariable1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(8)', 'public myVariable2: number this is myVariable2 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(9)', 'public myVariable3: number this is myVariable3 desc.');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'variable/index.html#static-variable-myExport1', 'href');
    });
  });

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has detail.', ()=> {
    find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=> {
      assert.includes(doc, '#static-variable-myExport1', 'public myExport1: MyExport1');
      assert.includes(doc, '[data-ice="importPath"]', "import myExport1 from 'esdoc-test-fixture/out/src/Export.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=> {
      assert.includes(doc, '#static-variable-myExport10', 'public myExport10: MyExport10');
      assert.includes(doc, '[data-ice="importPath"]', "import {myExport10} from 'esdoc-test-fixture/out/src/Export.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=> {
      assert.includes(doc, '#static-variable-myExport2', 'public myExport2: MyExport2');
      assert.includes(doc, '[data-ice="importPath"]', "import myExport2 from 'esdoc-test-fixture/out/src/Export.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(4)', (doc)=> {
      assert.includes(doc, '#static-variable-myExport3', 'public myExport3: MyExport3');
      assert.includes(doc, '[data-ice="importPath"]', "import myExport3 from 'esdoc-test-fixture/out/src/Export.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(5)', (doc)=> {
      assert.includes(doc, '#static-variable-myExport4', 'public myExport4: MyExport4');
      assert.includes(doc, '[data-ice="importPath"]', "import {myExport4} from 'esdoc-test-fixture/out/src/Export.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(6)', (doc)=> {
      assert.includes(doc, '#static-variable-myExport5', 'public myExport5: MyExport5');
      assert.includes(doc, '[data-ice="importPath"]', "import {myExport5} from 'esdoc-test-fixture/out/src/Export.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(7)', (doc)=> {
      assert.includes(doc, '#static-variable-myVariable1', 'public myVariable1: Object');
      assert.includes(doc, '[data-ice="importPath"]', "import myVariable1 from 'esdoc-test-fixture/out/src/myVariable.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(8)', (doc)=> {
      assert.includes(doc, '#static-variable-myVariable2', 'public myVariable2: number');
      assert.includes(doc, '[data-ice="importPath"]', "import {myVariable2} from 'esdoc-test-fixture/out/src/myVariable.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(9)', (doc)=> {
      assert.includes(doc, '#static-variable-myVariable3', 'public myVariable3: number');
    });
  });
});
