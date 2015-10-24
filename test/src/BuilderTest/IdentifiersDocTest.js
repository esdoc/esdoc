import {readDoc, assert, find} from './../util.js';

/** @test {IdentifiersDocBuilder} */
describe('Identifiers:', ()=> {
  let doc = readDoc('identifiers.html');

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has class summary.', ()=>{
    find(doc, '[data-ice="classSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public MyClass1 this class was deprecated. use MyClass1Ex instead of this class. this class is experimental. this class is dangerous. this is MyClass1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(24)', 'public SuperMyClass1 this is SuperMyClass1.');
    });
  });

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has interface summary.', ()=>{
    find(doc, '[data-ice="interfaceSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public MyInterface3 this is MyInterface3 desc.');
    });
  });

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has decorator summary.', ()=>{
    find(doc, '[data-ice="decoratorSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public classDecorator(target: class): class class decorator desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public methodDecorator(target: class | Object, attr: string, descriptor: Object): Object static/instance method decorator desc.');
    });
  });

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has function summary.', ()=>{
    find(doc, '[data-ice="functionSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public myFunction1() this is myFunction1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public myFunction5(p1: number, p2: string): Object this is myFunction5 desc.');
    });
  });

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has variable summary.', ()=>{
    find(doc, '[data-ice="variableSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public myExport1: MyExport1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(7)', 'public myVariable1: Object this is myVariable1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(9)', 'public myVariable3: number this is myVariable3 desc.');
    });
  });

  /** @test {IdentifiersDocBuilder#_buildIdentifierDoc} */
  it('has typedef summary.', ()=>{
    find(doc, '[data-ice="typedefSummary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public MyTypedef1: Object this is MyTypedef1 desc.');
    });
  });
});
