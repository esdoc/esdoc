import {readDoc, assert, find} from './../../util.js';

/** @test {ClassDoc#@extends} */
describe('TestExtendsExpression', ()=> {
  const doc = readDoc('class/src/Extends/Expression.js~TestExtendsExpression.html');

  it('has expression extends.', ()=> {
    find(doc, '.self-detail [data-ice="expressionExtends"]', (doc)=>{
      assert.includes(doc, 'pre code', 'class TestExtendsExpression extends TestExtendsExpressionInner(123)');
    });
  });

  it('has extends chain.', ()=> {
    find(doc, '.self-detail [data-ice="extendsChain"]', (doc)=>{
      assert.includes(doc, null, 'TestExtendsExpressionInner → TestExtendsExpression');
      assert.includes(doc, 'a[href$="#static-function-TestExtendsExpressionInner"]', 'TestExtendsExpressionInner');
    });
  });
});
