import {readDoc, assert, findParent} from './../../util.js';

/**
 * @test {ParamParser#parseParamValue}
 * @test {ParamParser#parseParam}
 */
describe('TestTypeUnion', ()=> {
  const doc = readDoc('class/src/Type/Union.js~TestTypeUnion.html');

  it('has union type.', ()=> {
    findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
      assert.includes(doc, null, 'method1(p1: number | string)');
      assert.multiIncludes(doc, '[data-ice="signature"] a', [
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number',
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'
      ], 'href');
    });
  });
});
