import assert from 'assert';
import MyClass from '../src/MyClass.js';

/** @testTarget {MyClass} */
describe('MyClass is super useful class.', ()=>{

  /** @testTarget {MyClass#sayMyName} */
  it('say my name', ()=>{
    let foo = new MyClass('Alice');
    assert.equal(foo.sayMyName(), 'My name is Alice');
  })
});
