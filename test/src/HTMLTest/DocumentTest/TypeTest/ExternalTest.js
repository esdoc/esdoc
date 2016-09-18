import {readDoc, assert, findParent} from './../../../util.js';

/**
 * @test {ParamParser#parseParamValue}
 * @test {ParamParser#parseParam}
 */
describe('TestTypeExternal', ()=> {
  const doc = readDoc('class/src/Type/External.js~TestTypeExternal.html');

  it('has external type.', ()=> {
    findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
      assert.includes(doc, null, 'method1(p1: XMLHttpRequest)');
      assert.includes(doc, 'a[href="https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest"]', 'XMLHttpRequest');
    });
  });
});
