import {readDoc, assert, findParent} from './../../../util.js';

/** @test {ParamParser#guessReturn} */
describe('TestGuessParam', ()=> {
  const doc = readDoc('class/src/Guess/Return.js~TestGuessReturn.html');

  describe('in summary', ()=> {
    it('has guessed return.', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method1(): number');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method2"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method2(): number[]');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method3"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method3(): {"x1": number, "x2": string}');
      });
    });
  });

  describe('in details', ()=>{
    it('has guessed param.', ()=>{
      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method1(): number');
      });

      findParent(doc, '[id="instance-method-method2"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method2(): number[]');
      });

      findParent(doc, '[id="instance-method-method3"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method3(): {"x1": number, "x2": string}');
      });
    });
  });
});
