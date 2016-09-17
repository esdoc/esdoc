import {readDoc, assert, findParent} from './../../util.js';

/**
 * @test {ParamParser#parseParamValue}
 * @test {ParamParser#parseParam}
 */
describe('TestTypeObject', ()=> {
  const doc = readDoc('class/src/Type/Object.js~TestTypeObject.html');

  it('has object type.', ()=> {
    findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
      assert.includes(doc, null, 'method1(p1: Object)');
      assert.multiIncludes(doc, '[data-ice="signature"] a', [
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'
      ], 'href');
    });
  });

  it('has object property.', ()=>{
    findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '.params [data-ice="property"]:nth-child(1)', 'p1 Object this is object p1.');
      assert.includes(doc, '.params [data-ice="property"]:nth-child(2)', 'p1.x1 number this is number x1.');
    });
  });
});
