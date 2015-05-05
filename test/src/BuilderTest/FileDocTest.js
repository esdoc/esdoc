import {readDoc, assert, find} from './../util.js';

/** @test {FileDocBuilder} */
describe('MyClass.js.html:', ()=> {
  let doc = readDoc('file/src/MyClass.js.html');

  /**
   * @test {FileDocBuilder#exec}
   * @test {FileDocBuilder#_buildFileDoc}
   */
  it('has source code.', ()=>{
    assert.includes(doc, 'body [data-ice="title"]', 'src/MyClass.js');
    assert.includes(doc, 'code[data-ice="content"]', 'export default class MyClass1 extends SuperMyClass1');
  });
});
