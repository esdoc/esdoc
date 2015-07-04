import {readDoc, assert, find} from './../util.js';

/** @test {DocBuilder#_buildNavDoc} */
describe('Nav:', ()=> {
  let doc = readDoc('index.html');

  /** @test {DocBuilder#_buildNavDoc} */
  it('has class nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="classWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="classDoc"]:nth-of-type(4)', 'MyClass1');
      assert.includes(doc, '[data-ice="classDoc"]:nth-of-type(4) a', 'class/src/MyClass.js~MyClass1.html', 'href');
    });
  });

  /** @test {DocBuilder#_buildNavDoc} */
  it('has interface nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="interfaceWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="interfaceDoc"]:nth-of-type(2)', 'MyInterface1');
      assert.includes(doc, '[data-ice="interfaceDoc"]:nth-of-type(2) a', 'class/src/MyInterface.js~MyInterface1.html', 'href');
    });
  });

  /** @test {DocBuilder#_buildNavDoc} */
  it('has function nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="functionWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="functionDoc"]:nth-of-type(1)', 'myFunction1');
      assert.includes(doc, '[data-ice="functionDoc"]:nth-of-type(1) a', 'function/index.html#static-function-myFunction1', 'href');
    });
  });

  /** @test {DocBuilder#_buildNavDoc} */
  it('has variable nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="variableWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="variableDoc"]:nth-of-type(1)', 'myExport1');
      assert.includes(doc, '[data-ice="variableDoc"]:nth-of-type(7)', 'myVariable1');
      assert.includes(doc, '[data-ice="variableDoc"]:nth-of-type(7) a', 'variable/index.html#static-variable-myVariable1', 'href');
    });
  });

  /** @test {DocBuilder#_buildNavDoc} */
  it('has typedef nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="typedefWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="typedefDoc"]:nth-of-type(1)', 'MyTypedef1');
      assert.includes(doc, '[data-ice="typedefDoc"]:nth-of-type(1) a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');
    });
  });

  /** @test {DocBuilder#_buildNavDoc} */
  it('has external nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="externalWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="externalDoc"]:nth-of-type(1)', 'MyError2');
      assert.includes(doc, '[data-ice="externalDoc"]:nth-of-type(1) a', 'example.com', 'href');
    });
  });
});
