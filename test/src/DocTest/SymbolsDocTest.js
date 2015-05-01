import {readDoc, assert, find} from './util.js';

describe('Symbols:', ()=> {
  let doc = readDoc('symbols.html');

  it('has class summary.', ()=>{
    find(doc, '[data-ice="classSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public MyClass1 this class was deprecated. use MyClass1Ex instead of this class. this class is experimental. this class is dangerous. this is MyClass1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(13)', 'public SuperMyClass1 this is SuperMyClass1.');
    });
  });

  it('has interface summary.', ()=>{
    find(doc, '[data-ice="interfaceSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public MyInterface3 this is MyInterface3 desc.');
    });
  });

  it('has function summary.', ()=>{
    find(doc, '[data-ice="functionSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public myFunction1() this is myFunction1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public myFunction5(p1: number, p2: string): Object this is myFunction5 desc.');
    });
  });

  it('has variable summary.', ()=>{
    find(doc, '[data-ice="variableSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public myVariable1: Object this is myVariable1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public myVariable3: number this is myVariable3 desc.');
    });
  });

  it('has typedef summary.', ()=>{
    find(doc, '[data-ice="typedefSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public MyTypedef1: Object this is MyTypedef1 desc.');
    });
  });
});
