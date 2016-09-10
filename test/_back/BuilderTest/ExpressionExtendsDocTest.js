import {readDoc, assert, find} from './../util.js';

/**
 * @test {ClassDocBuilder#_buildMixinClassesHTML}
 * @test {ClassDocBuilder#_buildExpressionExtendsHTML}
 */
describe('ExpressionExtends:', ()=> {
  describe('Mixin Extends:', ()=>{
    let doc = readDoc('class/src/MyExpressionExtend.js~MyExpressionExtendClass1.html');

    it('has expression and mixin', ()=> {
      find(doc, '.self-detail', (doc)=>{
        assert.includes(doc, '[data-ice="expressionExtends"]', 'Expression Extends:class MyExpressionExtendClass1 extends mix(MyClass1, MyClass2)');
        assert.includes(doc, '[data-ice="mixinExtends"]', 'Mixin Extends:MyClass1, MyClass2');
      });
    });
  });

  describe('Expression Extends:', ()=>{
    let doc = readDoc('class/src/MyExpressionExtend.js~MyExpressionExtendClass2.html');

    it('has expression', ()=> {
      find(doc, '.self-detail', (doc)=>{
        assert.includes(doc, '[data-ice="expressionExtends"]', 'Expression Extends:class MyExpressionExtendClass2 extends MyClass1(123)');
        assert.includes(doc, '[data-ice="extendsChain"]', 'XMLHttpRequest → SuperMyClass2 → SuperMyClass1 → MyClass1 → MyExpressionExtendClass2');
      });
    });
  });
});
