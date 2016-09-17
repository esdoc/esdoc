import {readDoc, assert, findParent} from './../../util.js';

/**
 * @test {ParamParser#parseParamValue}
 * @test {ParamParser#parseParam}
 */
describe('TestTypeClass', ()=> {
  const doc = readDoc('class/src/Type/Class.js~TestTypeClass.html');

  it('has class type.', ()=> {
    findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
      assert.includes(doc, null, 'method1(p1: TestTypeClassInner)');
      assert.includes(doc, 'a[href="class/src/Type/Class.js~TestTypeClassInner.html"]', 'TestTypeClassInner');
    });
  });
});
