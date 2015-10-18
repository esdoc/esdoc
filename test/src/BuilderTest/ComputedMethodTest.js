import {readDoc, assert, find} from './../util.js';

/** @test {MethodDoc#@_name} */
describe('ComputedMethod:', ()=> {
  let doc = readDoc('class/src/Z002_MyComputedMethodClass.js~Z002_MyComputedMethodClass.html');

  it('has computed method', ()=> {
    assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', "public ['foo']()");
    assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', "public [Symbol.iterator]()");
    assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', "public [`${ foo }`]()");
    assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', "public [foo + bar]()");
    assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', "public [foo()]()");
    assert.includes(doc, '[data-ice="target"]:nth-of-type(6)', "public [foo.bar()]()");
    assert.includes(doc, '[data-ice="target"]:nth-of-type(7)', "public [foo.bar.baz]()");
    assert.includes(doc, '[data-ice="target"]:nth-of-type(8)', "public * [foo.bar]()");
    assert.includes(doc, '[data-ice="target"]:nth-of-type(9)', "public [foo.p + bar]()");
    assert.includes(doc, '[data-ice="target"]:nth-of-type(10)', "public [foo]()");
  });
});
