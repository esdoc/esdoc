import {readDoc, assert, findParent} from './../../../util.js';

/** @test {VariableDoc} */
describe('testVariableArrayPattern', ()=> {
  const doc = readDoc('variable/index.html');

  describe('in summary', ()=> {
    it('has desc', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-variable-testVariableArrayPattern1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public testVariableArrayPattern1: number');
      });
    });
  });

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="static-variable-testVariableArrayPattern1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public testVariableArrayPattern1: number');
      });
    });
  });
});
