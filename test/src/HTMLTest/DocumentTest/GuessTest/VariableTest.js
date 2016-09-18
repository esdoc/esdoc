import {readDoc, assert, findParent} from './../../../util.js';

/** @test {ParamParser#guessType} */
describe('testGuessVariable', ()=> {
  const doc = readDoc('variable/index.html');

  describe('in summary', ()=> {
    it('has guessed type.', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#static-variable-testGuessVariable1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public testGuessVariable1: number');
      });

      findParent(doc, '[data-ice="summary"] [href$="#static-variable-testGuessVariable2"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public testGuessVariable2: number[]');
      });

      findParent(doc, '[data-ice="summary"] [href$="#static-variable-testGuessVariable3"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public testGuessVariable3: {"x1": number, "x2": string}');
      });

      findParent(doc, '[data-ice="summary"] [href$="#static-variable-testGuessVariable4"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public testGuessVariable4: string');
      });

    });
  });

  describe('in details', ()=>{
    it('has guessed type.', ()=>{
      findParent(doc, '[id="static-variable-testGuessVariable1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public testGuessVariable1: number');
      });

      findParent(doc, '[id="static-variable-testGuessVariable2"]', '[data-ice="detail"]', (doc)=> {
        assert.includes(doc, 'h3', 'public testGuessVariable2: number[]');
      });

      findParent(doc, '[id="static-variable-testGuessVariable3"]', '[data-ice="detail"]', (doc)=> {
        assert.includes(doc, 'h3', 'public testGuessVariable3: {"x1": number, "x2": string}');
      });

      findParent(doc, '[id="static-variable-testGuessVariable4"]', '[data-ice="detail"]', (doc)=> {
        assert.includes(doc, 'h3', 'public testGuessVariable4: string');
      });
    });
  });
});
