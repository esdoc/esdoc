import {readDoc, assert, find} from './util.js';

describe('MyClass999:', ()=>{
  it('is not exist.', ()=>{
    try {
      readDoc('@class-src|MyClass.js~MyClass999.html');
    } catch(e) {
      assert(e instanceof Error);
      assert(e.message.includes('no such file or directory'));
      return;
    }
    assert(false, 'unreachable');
  });
});
