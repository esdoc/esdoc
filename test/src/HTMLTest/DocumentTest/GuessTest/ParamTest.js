import {readDoc, assert, findParent} from './../../../util.js';

/** @test {ParamParser#guessParam} */
describe('TestGuessParam', ()=> {
  const doc = readDoc('class/src/Guess/Param.js~TestGuessParam.html');

  describe('in summary', ()=> {
    it('has guessed param.', ()=> {
      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method1"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method1(p1: number, p2: string)');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method2"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method2(p1: number[], p2: {"x1": string, "x2": boolean})');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method3"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method3(arrayPattern: number[])');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method4"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method4(objectPattern: {"x1": number, "x2": string})');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method5"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method5(p1: ...*)');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method6"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method6(objectPattern: {"x1": *, "x2": *})');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method7"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method7(p1: *)');
      });

      findParent(doc, '[data-ice="summary"] [href$="#instance-method-method8"]', '[data-ice="target"]', (doc)=> {
        assert.includes(doc, null, 'public method8(p1: *)');
      });
    });
  });

  describe('in details', ()=>{
    it('has guessed param.', ()=>{
      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method1(p1: number, p2: string)');
        assert.includes(doc, '.params tbody tr:nth-child(1)', 'p1 number optional default: 123');
        assert.includes(doc, '.params tbody tr:nth-child(2)', 'p2 string optional default: text');
      });

      findParent(doc, '[id="instance-method-method2"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method2(p1: number[], p2: {"x1": string, "x2": boolean})');
        assert.includes(doc, '.params tbody tr:nth-child(1)', 'p1 number[] optional default: [123,456]');
        assert.includes(doc, '.params tbody tr:nth-child(2)', 'p2 {"x1": string, "x2": boolean} optional default: {"x1":"text","x2":true}');
      });

      findParent(doc, '[id="instance-method-method3"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method3(arrayPattern: number[])');
        assert.includes(doc, '.params tbody tr:nth-child(1)', 'arrayPattern number[] optional default: [123,456]');
      });

      findParent(doc, '[id="instance-method-method4"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method4(objectPattern: {"x1": number, "x2": string})');
        assert.includes(doc, '.params tbody tr:nth-child(1)', 'objectPattern {"x1": number, "x2": string} optional default: {"x1":123,"x2":"text"}');
      });

      findParent(doc, '[id="instance-method-method5"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method5(p1: ...*)');
        assert.includes(doc, '.params tbody tr:nth-child(1)', 'p1 ...*');
      });

      findParent(doc, '[id="instance-method-method6"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method6(objectPattern: {"x1": *, "x2": *})');
        assert.includes(doc, '.params tbody tr:nth-child(1)', 'objectPattern {"x1": *, "x2": *} default: {"x1":null,"x2":null}');
      });

      findParent(doc, '[id="instance-method-method7"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public method7(p1: *)');
        assert.includes(doc, '.params tbody tr:nth-child(1)', 'p1 * optional default: value');
      });

      findParent(doc, '[id="instance-method-method8"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, 'h3', 'public ');
        assert.includes(doc, '.params tbody tr:nth-child(1)', 'p1 * optional');
      });
    });
  });
});
