import {readDoc, assert, findParent} from './../../util.js';

/** @test {TypedefDoc} */
describe('TestTypedefDefinition', ()=> {
  const doc = readDoc('typedef/index.html');

  describe('in summary', ()=> {
    it('has desc', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-typedef-TestTypedefDefinition"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public TestTypedefDefinition: Object');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-typedef-TestTypedefDefinition"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public TestTypedefDefinition: Object');
        assert.includes(doc, '.params [data-ice="property"]:nth-child(1)', 'p1 number this is p1.');
      });
    });
  });
});
