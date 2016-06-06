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
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(30)', 'MyInterface1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(30) a', 'class/src/MyInterface.js~MyInterface1.html', 'href');

      // function
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(34)', 'myFunction1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(34) a', 'function/index.html#static-function-myFunction1', 'href');

      // variable
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(46)', 'myExport10');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(54)', 'myVariable1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(54) a', 'variable/index.html#static-variable-myVariable1', 'href');

      // typedef
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(62)', 'MyTypedef1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(62) a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');

      // external
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(64)', 'MyError2');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(64) a', 'example.com', 'href');
    });
  });
});
