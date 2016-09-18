import {readDoc, assert, findParent} from './../../../util.js';

/** @test {ParamParser#guessParam} */
describe('TestGuessProperty', ()=> {
  const doc = readDoc('class/src/Guess/Property.js~TestGuessProperty.html');

  describe('in summary', ()=> {
    it('has guessed member.', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#instance-member-p1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public p1: number');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-member-p2"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public p2: number[]');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-member-p3"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public p3: {"x1": number, "x2": string}');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-member-p4"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public p4: string');
      });
    });
  });

  describe('in details', ()=>{
    it('has guessed member.', ()=>{
      findParent(doc, '[id="instance-member-p1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public p1: number');
      });

      findParent(doc, '[id="instance-member-p2"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public p2: number[]');
      });

      findParent(doc, '[id="instance-member-p3"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public p3: {"x1": number, "x2": string}');
      });

      findParent(doc, '[id="instance-member-p4"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public p4: string');
      });
    });
  });
});
