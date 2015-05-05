import {readDoc, assert, find} from './../util.js';

/** @test {DocResolver} */
describe('DocResolver:', ()=>{
  let docMyClass7 = readDoc('class/src/MyClass.js~MyClass7.html');
  let docMyClass8 = readDoc('class/src/MyClass.js~MyClass8.html');

  /** @test {DocResolver#_resolveIgnore} */
  it('does not ignore identifier that does not have @ignore.', ()=>{
    // MyClass7
    assert.includes(docMyClass7, '.self-detail [data-ice="name"]', 'MyClass7');
    find(docMyClass7, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public method1() this is method1 desc.');
    });

    // MyClass8
    assert.includes(docMyClass8, '.self-detail [data-ice="name"]', 'MyClass8');
    find(docMyClass8, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public method1() this is method1 desc.');
    });
  });

  /** @test {DocResolver#_resolveIgnore} */
  it('ignores identifier that have @ignore.', ()=>{
    try {
      readDoc('class/src/MyClass.js~MyClass999.html');
    } catch(e) {
      assert(e instanceof Error);
      assert(e.message.includes('no such file or directory'));
      return;
    }
    assert(false, 'unreachable');
  });
});
