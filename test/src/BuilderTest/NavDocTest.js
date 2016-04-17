import {readDoc, assert, find} from './../util.js';

/** @test {DocBuilder#_buildNavDoc} */
describe('Nav:', ()=> {
  let doc = readDoc('index.html');

  /** @test {DocBuilder#_buildNavDoc} */
  it('has each nav.', ()=>{
    find(doc, '[data-ice="nav"]', (doc)=>{
      // class
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(12)', 'MyExport11');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(12) a', 'class/src/Export.js~MyExport11.html', 'href');

      // interface
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(29)', 'MyInterface1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(29) a', 'class/src/MyInterface.js~MyInterface1.html', 'href');

      // function
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(32)', 'myFunction1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(32) a', 'function/index.html#static-function-myFunction1', 'href');

      // variable
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(44)', 'myExport10');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(52)', 'VmyVariable3');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(52) a', 'variable/index.html#static-variable-myVariable3', 'href');

      // typedef
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(60)', 'MyTypedef1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(60) a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');

      // external
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(62)', 'MyError2');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(62) a', 'example.com', 'href');
    });
  });
});
