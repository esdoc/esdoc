import {readDoc, assert, findParent} from './../../util.js';

/** @test {VariableDoc} */
describe('testVariableDefinition', ()=> {
  const doc = readDoc('variable/index.html');

  describe('in summary', ()=> {
    it('has desc', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-variable-testVariableDefinition"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public testVariableDefinition: number');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-variable-testVariableDefinition"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public testVariableDefinition: number');
      });
    });
  });
});
