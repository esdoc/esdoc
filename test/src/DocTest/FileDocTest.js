import {readDoc, assert, find} from './util.js';

describe('MyClass.js.html:', ()=> {
  let doc = readDoc('file/src/MyClass.js.html');

  it('has source code.', ()=>{
    assert.includes(doc, 'body [data-ice="title"]', 'src/MyClass.js');
    assert.includes(doc, 'code[data-ice="content"]', 'export default class MyClass1 extends SuperMyClass1');
  });
});
