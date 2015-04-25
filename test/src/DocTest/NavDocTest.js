import {readDoc, assert, find} from './util.js';

describe('INDEX:', ()=> {
  let doc = readDoc('index.html');

  it('has class nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="classWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="classDoc"]:nth-of-type(1)', 'MyClass1');
      assert.includes(doc, '[data-ice="classDoc"]:nth-of-type(1) a', 'class/src/MyClass.js~MyClass1.html', 'href');
    });
  });

  it('has interface nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="interfaceWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="interfaceDoc"]:nth-of-type(2)', 'MyInterface1');
      assert.includes(doc, '[data-ice="interfaceDoc"]:nth-of-type(2) a', 'class/src/MyInterface.js~MyInterface1.html', 'href');
    });
  });

  it('has function nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="functionWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="functionDoc"]:nth-of-type(1)', 'myFunction1');
      assert.includes(doc, '[data-ice="functionDoc"]:nth-of-type(1) a', 'function/index.html#static-function-myFunction1', 'href');
    });
  });

  it('has variable nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="variableWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="variableDoc"]:nth-of-type(1)', 'myVariable1');
      assert.includes(doc, '[data-ice="variableDoc"]:nth-of-type(1) a', 'variable/index.html#static-variable-myVariable1', 'href');
    });
  });

  it('has typedef nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="typedefWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="typedefDoc"]:nth-of-type(1)', 'MyTypedef1');
      assert.includes(doc, '[data-ice="typedefDoc"]:nth-of-type(1) a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');
    });
  });

  it('has file nav.', ()=>{
    find(doc, '[data-ice="nav"] [data-ice="fileWrap"]', (doc)=>{
      assert.includes(doc, '[data-ice="fileDoc"]:nth-of-type(1)', 'src/MyClass.js');
      assert.includes(doc, '[data-ice="fileDoc"]:nth-of-type(1) a', 'file/src/MyClass.js.html', 'href');
    });
  });
});
