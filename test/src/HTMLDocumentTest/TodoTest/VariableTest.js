import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@todo} */
describe('testTodoVariable', ()=> {
  const doc = readDoc('variable/index.html');

  it('has see.', ()=>{
    findParent(doc, '[id="static-variable-testTodoVariable"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="todo"]', 'this is todo.');
    });
  });
});
