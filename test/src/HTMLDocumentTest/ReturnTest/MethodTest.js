import {readDoc, assert, findParent} from './../../util.js';

/** @test {MethodDoc#@return} */
describe('TestReturnMethod', ()=> {
  const doc = readDoc('class/src/Return/Method.js~TestReturnMethod.html');

  describe('in summary', ()=> {
    it('has return', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method1(): number');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method2"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method2(): TestClassDefinition');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method1(): number');
        assert.includes(doc, '[data-ice="returnParams"] tbody tr', 'number this is return value.');
      });

      findParent(doc, '[id="instance-method-method2"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method2(): TestClassDefinition');
        assert.includes(doc, '[data-ice="returnParams"] tbody tr', 'TestClassDefinition this is return value.');
        assert.includes(doc, '[data-ice="returnParams"] tbody tr a', 'class/src/Class/Definition.js~TestClassDefinition.html', 'href');
      });
    });
  });
});
