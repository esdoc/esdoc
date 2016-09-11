import {readDoc, assert, find, findParent} from './../../util.js';

/**
 * @test {ClassDoc#@extends}
 * @test {ClassDocBuilder#_buildInheritedSummaryHTML}
 */
describe('test deep extends', ()=>{
  describe('TestExtendsDeepSquare', ()=> {
    const doc = readDoc('class/src/Extends/Deep.js~TestExtendsDeepSquare.html');

    it('has extends chain.', ()=> {
      find(doc, '.self-detail [data-ice="extendsChain"]', (doc)=>{
        assert.includes(doc, null, 'TestExtendsDeepShape → TestExtendsDeepRectangle → TestExtendsDeepSquare');
        assert.includes(doc, 'a[href$="Array"]', 'Array');
        assert.includes(doc, 'a[href="class/src/Extends/Deep.js~TestExtendsDeepShape.html"]', 'TestExtendsDeepShape');
        assert.includes(doc, 'a[href="class/src/Extends/Deep.js~TestExtendsDeepRectangle.html"]', 'TestExtendsDeepRectangle');
      });
    });

    it('has super^1 class methods and more.', ()=>{
      findParent(doc, '[data-ice="inheritedSummary"] a[href$="TestExtendsDeepRectangle.html"]', '[data-ice="summary"]', (doc)=>{
        assert.includes(doc, 'thead', 'From class TestExtendsDeepRectangle');
        assert.includes(doc, 'thead a', 'class/src/Extends/Deep.js~TestExtendsDeepRectangle.html', 'href');

        assert.includes(doc, 'a[href$="#static-get-staticValueRectangle"]', 'staticValueRectangle');
        assert.includes(doc, 'a[href$="#static-set-staticValueRectangle"]', 'staticValueRectangle');
        assert.includes(doc, 'a[href$="#static-member-staticPRectangle"]', 'staticPRectangle');
        assert.includes(doc, 'a[href$="#static-method-staticMethodRectangle"]', 'staticMethodRectangle');

        assert.includes(doc, 'a[href$="#instance-get-valueRectangle"]', 'valueRectangle');
        assert.includes(doc, 'a[href$="#instance-set-valueRectangle"]', 'valueRectangle');
        assert.includes(doc, 'a[href$="#instance-member-pRectangle"]', 'pRectangle');
        assert.includes(doc, 'a[href$="#instance-method-methodRectangle"]', 'methodRectangle');
      });
    });

    it('has super^2 class methods and more.', ()=>{
      findParent(doc, '[data-ice="inheritedSummary"] a[href$="TestExtendsDeepShape.html"]', '[data-ice="summary"]', (doc)=>{
        assert.includes(doc, 'thead', 'From class TestExtendsDeepShape');
        assert.includes(doc, 'thead a', 'class/src/Extends/Deep.js~TestExtendsDeepShape.html', 'href');

        assert.includes(doc, 'a[href$="#static-get-staticValueShape"]', 'staticValueShape');
        assert.includes(doc, 'a[href$="#static-set-staticValueShape"]', 'staticValueShape');
        assert.includes(doc, 'a[href$="#static-member-staticPShape"]', 'staticPShape');
        assert.includes(doc, 'a[href$="#static-method-staticMethodShape"]', 'staticMethodShape');

        assert.includes(doc, 'a[href$="#instance-get-valueShape"]', 'valueShape');
        assert.includes(doc, 'a[href$="#instance-set-valueShape"]', 'valueShape');
        assert.includes(doc, 'a[href$="#instance-member-pShape"]', 'pShape');
        assert.includes(doc, 'a[href$="#instance-method-methodShape"]', 'methodShape');
      });
    });
  });

  describe('TestExtendsDeepRectangle', ()=>{
    const doc = readDoc('class/src/Extends/Deep.js~TestExtendsDeepRectangle.html');

    it('has direct subclass.', ()=> {
      find(doc, '.self-detail [data-ice="directSubclass"]', (doc)=>{
        assert.includes(doc, 'a[href="class/src/Extends/Deep.js~TestExtendsDeepSquare.html"]', 'TestExtendsDeepSquare');
      });
    });
  });

  describe('TestExtendsDeepShape', ()=>{
    const doc = readDoc('class/src/Extends/Deep.js~TestExtendsDeepShape.html');

    it('has direct subclass.', ()=> {
      find(doc, '.self-detail [data-ice="directSubclass"]', (doc)=>{
        assert.includes(doc, 'a[href="class/src/Extends/Deep.js~TestExtendsDeepRectangle.html"]', 'TestExtendsDeepRectangle');
      });
    });

    it('has indirect subclass.', ()=> {
      find(doc, '.self-detail [data-ice="indirectSubclass"]', (doc)=>{
        assert.includes(doc, 'a[href="class/src/Extends/Deep.js~TestExtendsDeepSquare.html"]', 'TestExtendsDeepSquare');
      });
    });
  });
});
