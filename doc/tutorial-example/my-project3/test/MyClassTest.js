import assert from 'assert';
import MyClass from '../src/MyClass.js';

describe('MyClass is super useful class.', ()=>{
  it('say my name', ()=>{
    let foo = new MyClass('Alice');
    assert.equal(foo.sayMyName(), 'My name is Alice');
  })
});
