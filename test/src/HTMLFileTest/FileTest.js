import {readDoc, assert} from './../util.js';

/** @test {FileDocBuilder} */
describe('test source code file', ()=> {
  const doc = readDoc('file/src/Desc/Class.js.html');

  it('has source code.', ()=>{
    assert.includes(doc, 'body [data-ice="title"]', 'src/Desc/Class.js');
    assert.includes(doc, 'code[data-ice="content"]', 'export default class TestDescClass {');
  });
});
