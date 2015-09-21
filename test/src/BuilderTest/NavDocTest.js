import {readDoc, assert, find} from './../util.js';

/** @test {DocBuilder#_buildNavDoc} */
describe('Nav:', ()=> {
  let doc = readDoc('index.html');

  /** @test {DocBuilder#_buildNavDoc} */
  it('has each nav.', ()=>{
    find(doc, '[data-ice="nav"]', (doc)=>{
      // class
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(11)', 'MyClass1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(11) a', 'class/src/MyClass.js~MyClass1.html', 'href');

      // interface
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(27)', 'MyInterface1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(27) a', 'class/src/MyInterface.js~MyInterface1.html', 'href');

      // function
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(30)', 'myFunction1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(30) a', 'function/index.html#static-function-myFunction1', 'href');

      // variable
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(41)', 'myExport1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(49)', 'myVariable1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(49) a', 'variable/index.html#static-variable-myVariable1', 'href');

      // typedef
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(57)', 'MyTypedef1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(57) a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');

      // external
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(59)', 'MyError2');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(59) a', 'example.com', 'href');
    });
  });
});
