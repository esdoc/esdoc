import {readDoc, assert, findParent} from './../../util.js';

/** @test {FunctionDoc#@param} */
describe('testParamFunction', ()=> {
  const doc = readDoc('function/index.html');

  describe('in summary', ()=> {
    it('has param.', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-function-testParamFunction"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public testParamFunction(p1: number)');
      });
    });
  });

  describe('in details', ()=>{
    it('has param.', ()=>{
      findParent(doc, '[id="static-function-testParamFunction"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public testParamFunction(p1: number)');
        assert.includes(doc, '.params tbody tr:nth-child(1)', 'p1 number this is p1.');
      });
    });
  });
});
