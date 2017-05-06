import assert from 'assert';
import {find} from '../../util';

describe('test/Todo/Todo:', ()=>{
  it('hash todo', ()=>{
    const doc = find('longname', 'src/Todo/Todo.js~TestTodo');
    assert.deepEqual(doc.todo, ['this is first todo.', 'this is second todo.']);
  });
});
