import {readDoc, assert, find} from './../util.js';

/** @test {DocBuilder#_buildNavDoc} */
describe('Nav:', ()=> {
  let doc = readDoc('index.html');

  /** @test {DocBuilder#_buildNavDoc} */
  it('has each nav.', ()=>{
    find(doc, '[data-ice="nav"]', (doc)=>{
      // class
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(12)', 'MyClass1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(12) a', 'class/src/MyClass.js~MyClass1.html', 'href');

      // interface
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(29)', 'MyInterface1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(29) a', 'class/src/MyInterface.js~MyInterface1.html', 'href');

      // function
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(32)', 'myFunction1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(32) a', 'function/index.html#static-function-myFunction1', 'href');

      // variable
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(44)', 'myExport1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(53)', 'myVariable1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(53) a', 'variable/index.html#static-variable-myVariable1', 'href');

      // typedef
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(61)', 'MyTypedef1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(61) a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');

      // external
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(63)', 'MyError2');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(63) a', 'example.com', 'href');
    });
  });
});
