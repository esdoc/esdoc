import {readDoc, assert, find, findParent} from './../../util.js';

/** @test {AbstractDoc#@todo} */
describe('TestTodoClass', ()=> {
  const doc = readDoc('class/src/Todo/Class.js~TestTodoClass.html');

  it('has todo at class.', ()=> {
    find(doc, '.self-detail [data-ice="todo"]', (doc)=>{
      assert.includes(doc, 'li:nth-child(1)', 'this is first todo.');
      assert.includes(doc, 'li:nth-child(2)', 'this is second todo.');
    });
  });

  it('has todo at constructor.', ()=>{
    findParent(doc, '[id="instance-constructor-constructor"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="todo"]', 'this is todo');
    });
  });

  it('has see from member.', ()=>{
    findParent(doc, '[id="instance-member-p1"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="todo"]', 'this is todo');
    });
  });

  it('has see from method.', ()=>{
    findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="todo"]', 'this is todo');
    });
  });
});
