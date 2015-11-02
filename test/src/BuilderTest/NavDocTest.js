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
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(28)', 'MyInterface1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(28) a', 'class/src/MyInterface.js~MyInterface1.html', 'href');

      // decorator 
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(31) [data-ice="kind"]', 'D');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(31)', 'classDecorator');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(31) a', 'decorator/index.html#static-decorator-classDecorator', 'href');

      // function
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(39)', 'myFunction1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(39) a', 'function/index.html#static-function-myFunction1', 'href');

      // variable
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(51)', 'myExport1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(59)', 'myVariable1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(59) a', 'variable/index.html#static-variable-myVariable1', 'href');

      // typedef
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(67)', 'MyTypedef1');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(67) a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');

      // external
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(69)', 'MyError2');
      assert.includes(doc, '[data-ice="doc"]:nth-of-type(69) a', 'example.com', 'href');
    });
  });
});
