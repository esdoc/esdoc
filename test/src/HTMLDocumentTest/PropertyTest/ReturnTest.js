import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@property} */
describe('TestPropertyReturn', ()=> {
  const doc = readDoc('class/src/Property/Return.js~TestPropertyReturn.html');

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="returnProperties"] tbody tr:nth-child(1)', 'x1 number this is x1 of return value.');
        assert.includes(doc, '[data-ice="returnProperties"] tbody tr:nth-child(2)', 'x2 TestClassDefinition this is x2 of return value.');
        assert.includes(doc, '[data-ice="returnProperties"] tbody tr:nth-child(2) a', 'class/src/Class/Definition.js~TestClassDefinition.html', 'href');
      });
    });
  });
});
