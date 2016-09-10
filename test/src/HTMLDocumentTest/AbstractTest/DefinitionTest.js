import {readDoc, assert, find} from './../../util.js';

/** @test {DocBuilder} */
describe('TestAbstractDefinition:', ()=> {
  const doc = readDoc('class/src/Abstract/Definition.js~TestAbstractDefinition.html');

  /** @test {DocBuilder#_buildSummaryDoc} */
  it('has abstract method in summary.', ()=> {
    find(doc, '[data-ice="summary"]', (doc)=> {
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', "public abstract method1() this is abstract method1");
      assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', "public abstract method2() this is abstract method2");
    });
  });

  /** @test {DocBuilder#_buildDetailDocs} */
  it('has abstract method in detail.', ()=>{
    assert.includes(doc, '[data-ice="detail"]:nth-of-type(1)', "public abstract method1()");
    assert.includes(doc, '[data-ice="detail"]:nth-of-type(2)', "public abstract method2()");
  });
});
