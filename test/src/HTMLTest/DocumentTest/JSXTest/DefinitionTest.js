import {readDoc, assert, findParent} from './../../../util.js';

/** @test {ESParser} */
describe('TestJSXDefinition', ()=> {
  const doc = readDoc('class/src/JSX/Definition.js~TestJSXDefinition.html');

  describe('in self detail', ()=> {
    it('has desc.', ()=> {
      assert.includes(doc, '.self-detail [data-ice="description"]', 'this is TestJSXDefinition.');
    });
  });

  describe('in summary', ()=> {
    it('has desc', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, '[data-ice="description"]', 'this is method1.');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="description"]', 'this is method1.');
      });
    });
  });
});
