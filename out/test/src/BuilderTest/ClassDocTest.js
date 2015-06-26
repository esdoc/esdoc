'use strict';

var _utilJs = require('./../util.js');

/** @test {ClassDocBuilder} */
describe('MyClass1:', function () {
  var doc = (0, _utilJs.readDoc)('class/src/MyClass.js~MyClass1.html');

  /** @test {DocBuilder#_getTitle} */
  it('has document title', function () {
    _utilJs.assert.includes(doc, 'head title', 'MyClass1 | ESDoc Test Fixture API Document');
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has header notice.', function () {
    (0, _utilJs.find)(doc, '[data-ice="content"] .header-notice', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="importPath"]', 'import MyClass1 from \'esdoc-test-fixture\'');
      _utilJs.assert.includes(doc, '[data-ice="access"]', 'public');
      _utilJs.assert.includes(doc, '[data-ice="kind"]', 'class');
      _utilJs.assert.includes(doc, '[data-ice="source"]', 'source');
      _utilJs.assert.includes(doc, '[data-ice="source"] a', 'file/src/MyClass.js.html#lineNumber43', 'href');
      _utilJs.assert.includes(doc, '[data-ice="version"]', 'version 0.0.1');
      _utilJs.assert.includes(doc, '[data-ice="since"]', 'since 1.2.3');
    });
  });

  /**
   * @test {ClassDocBuilder#_buildClassDoc}
   * @test {ClassDocBuilder#_buildExtendsChainHTML}
   * @test {ClassDocBuilder#_buildIndirectSubclassHTML}
   * @test {ClassDocBuilder#_buildDirectSubclassHTML}
   */
  it('has self detail.', function () {
    (0, _utilJs.find)(doc, '[data-ice="content"] .self-detail', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="name"]', 'MyClass1');

      _utilJs.assert.includes(doc, '[data-ice="extendsChain"]', 'XMLHttpRequest → SuperMyClass2 → SuperMyClass1 → MyClass1');
      _utilJs.assert.includes(doc, '[data-ice="extendsChain"] span:nth-of-type(1) a', 'https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest', 'href');
      _utilJs.assert.includes(doc, '[data-ice="extendsChain"] span:nth-of-type(2) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass2.html', 'href');
      _utilJs.assert.includes(doc, '[data-ice="extendsChain"] span:nth-of-type(3) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html', 'href');

      _utilJs.assert.includes(doc, '[data-ice="directSubclass"]', 'MyClass2');
      _utilJs.assert.includes(doc, '[data-ice="directSubclass"] span:nth-of-type(1) a', 'class/src/MyClass.js~MyClass2.html', 'href');

      _utilJs.assert.includes(doc, '[data-ice="indirectSubclass"]', 'MyClass3');
      _utilJs.assert.includes(doc, '[data-ice="indirectSubclass"] span:nth-of-type(1) a', 'class/src/MyClass.js~MyClass3.html', 'href');

      _utilJs.assert.includes(doc, '[data-ice="implements"]', 'MyInterface1, XMLHttpRequest');
      _utilJs.assert.includes(doc, '[data-ice="implements"] li:nth-of-type(1) a', 'class/src/MyInterface.js~MyInterface1.html', 'href');
      _utilJs.assert.includes(doc, '[data-ice="implements"] li:nth-of-type(2) a', 'https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest', 'href');

      _utilJs.assert.includes(doc, '[data-ice="indirectImplements"]', 'MyInterface2, MyInterface3');
      _utilJs.assert.includes(doc, '[data-ice="indirectImplements"] li:nth-of-type(1) a', 'class/src/MyInterface.js~MyInterface2.html', 'href');
      _utilJs.assert.includes(doc, '[data-ice="indirectImplements"] li:nth-of-type(2) a', 'class/src/MyInterface.js~MyInterface3.html', 'href');

      _utilJs.assert.includes(doc, '[data-ice="directImplemented"]', 'MyClass5');
      _utilJs.assert.includes(doc, '[data-ice="directImplemented"] span:nth-of-type(1) a', 'class/src/MyClass.js~MyClass5.html', 'href');

      _utilJs.assert.includes(doc, '[data-ice="indirectImplemented"]', 'MyClass6');
      _utilJs.assert.includes(doc, '[data-ice="indirectImplemented"] span:nth-of-type(1) a', 'class/src/MyClass.js~MyClass6.html', 'href');

      _utilJs.assert.includes(doc, '[data-ice="description"]', 'this is MyClass1 desc.');

      _utilJs.assert.includes(doc, '[data-ice="deprecated"]', 'this class was deprecated. use MyClass1Ex instead of this class.');
      _utilJs.assert.includes(doc, '[data-ice="experimental"]', 'this class is experimental. this class is dangerous.');

      (0, _utilJs.find)(doc, '[data-ice="see"]', function (doc) {
        _utilJs.assert.includes(doc, 'li:nth-child(1)', 'http://example.com');
        _utilJs.assert.includes(doc, 'li:nth-child(1) a', 'http://example.com', 'href');

        _utilJs.assert.includes(doc, 'li:nth-child(2)', 'MyClass2');
        _utilJs.assert.includes(doc, 'li:nth-child(2) a', 'class/src/MyClass.js~MyClass2.html', 'href');

        _utilJs.assert.includes(doc, 'li:nth-child(3)', 'SuperMyClass1#superMethod');
        _utilJs.assert.includes(doc, 'li:nth-child(3) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html#instance-method-superMethod', 'href');
      });

      (0, _utilJs.find)(doc, '[data-ice="todo"]', function (doc) {
        _utilJs.assert.includes(doc, 'li:nth-child(1)', 'this is todo1');
        _utilJs.assert.includes(doc, 'li:nth-child(2)', 'this is todo2');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has static member summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="staticMemberSummary"]', function (doc) {

      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static p1: number this is static p1 desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'class/src/MyClass.js~MyClass1.html#static-member-p1', 'href');
      });

      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public static get staticValue: number this is staticValue(get) desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2) [data-ice="name"] a', 'class/src/MyClass.js~MyClass1.html#static-get-staticValue', 'href');
      });

      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public static set staticValue: number this is staticValue(set) desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3) [data-ice="name"] a', 'class/src/MyClass.js~MyClass1.html#static-set-staticValue', 'href');
      });

      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(2)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected static p2: number this is static p2 desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'class/src/MyClass.js~MyClass1.html#static-member-p2', 'href');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has static method summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="staticMethodSummary"]', function (doc) {
      // public
      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static staticMethod1() this is staticMethod1 desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', 'class/src/MyClass.js~MyClass1.html#static-method-staticMethod1', 'href');
      });
      // protected
      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(2)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected static staticMethod2()');
      });
      // private
      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(3)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private static staticMethod3()');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has constructor summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="constructorSummary"]', function (doc) {
      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public constructor(p1: number) this is constructor desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'class/src/MyClass.js~MyClass1.html#instance-constructor-constructor', 'href');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has member summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="memberSummary"]', function (doc) {
      // public
      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(1)', function (doc) {
        // p1
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public p1: number this is p1 desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'class/src/MyClass.js~MyClass1.html#instance-member-p1', 'href');

        // p5
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public p5: number');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2) [data-ice="name"] a', 'class/src/MyClass.js~MyClass1.html#instance-member-p5', 'href');

        // p6
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public p6: *');

        // p7
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public p7: *');

        // value
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public get value: number this is value(get) desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(5) [data-ice="name"] a', 'class/src/MyClass.js~MyClass1.html#instance-get-value', 'href');

        // value
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(6)', 'public set value: number this is value(set) desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(6) [data-ice="name"] a', 'class/src/MyClass.js~MyClass1.html#instance-set-value', 'href');
      });

      // protected
      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(2)', function (doc) {
        // p2
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected p2: number');
      });

      // private
      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(3)', function (doc) {
        // p3
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private p3: number');

        // p4
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'private p4: function');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has method summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="methodSummary"]', function (doc) {
      // public
      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public abstract method1(p1: number[], p2: number, p3: number, p4: number | string[], p5: number, p6: number, p7: {a: number, b: string}, p8: Object, p9: MyClass2 | MyClass3[] | {a: number, b: string}): Object');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this method was deprecated.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this method is experimental.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this is method1 desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="version"]', 'version 0.0.1');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="since"]', 'since 1.2.3');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'class/src/MyClass.js~MyClass1.html#instance-method-method1', 'href');

        // undocument identifiers that are auto detected.
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public method5(p1: number, p2: string, p3: *[]): number');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public method6(p1: *)');
      });
      // protected
      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(2)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected method2() this is method2 desc.');
      });
      // private
      (0, _utilJs.find)(doc, 'table[data-ice="summary"]:nth-of-type(3)', function (doc) {
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private _method7() this is auto private.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'private method3() this is method3 desc.');
        _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'private * method4(): Generator this is method4 desc.');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildInheritedSummaryHTML} */
  it('has inherited summary.', function () {
    (0, _utilJs.find)(doc, '[data-ice="inheritedSummary"] [data-ice="summary"]:nth-of-type(1)', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static get ultraStaticValue');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass2.html#static-get-ultraStaticValue', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public static set ultraStaticValue');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass2.html#static-set-ultraStaticValue', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public static ultraP1');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3) [data-ice="name"] a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass2.html#static-member-ultraP1', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public static ultraStaticMethod()');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(4) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass2.html#static-method-ultraStaticMethod', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public get ultraValue');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(5) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass2.html#instance-get-ultraValue', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(6)', 'public set ultraValue');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(6) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass2.html#instance-set-ultraValue', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(7)', 'public ultraP1');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(7) [data-ice="name"] a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass2.html#instance-member-ultraP1', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(8)', 'public ultraMethod()');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(8) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass2.html#instance-method-ultraMethod', 'href');
    });

    (0, _utilJs.find)(doc, '[data-ice="inheritedSummary"] [data-ice="summary"]:nth-of-type(2)', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static get superStaticValue');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html#static-get-superStaticValue', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public static set superStaticValue');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(2) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html#static-set-superStaticValue', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public static superP1');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(3) [data-ice="name"] a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html#static-member-superP1', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public static superStaticMethod()');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(4) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html#static-method-superStaticMethod', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public get superValue');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(5) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html#instance-get-superValue', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(6)', 'public set superValue');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(6) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html#instance-set-superValue', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(7)', 'public superP1');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(7) [data-ice="name"] a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html#instance-member-superP1', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(8)', 'public method1()');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(8) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html#instance-method-method1', 'href');

      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(9)', 'public superMethod()');
      _utilJs.assert.includes(doc, '[data-ice="target"]:nth-of-type(9) a', 'class/src/OtherClass/SuperMyClass.js~SuperMyClass1.html#instance-method-superMethod', 'href');
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has static member detail.', function () {
    (0, _utilJs.find)(doc, '[data-ice="staticMemberDetails"]', function (doc) {
      // public
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '#static-member-p1', 'public static p1: number');
        _utilJs.assert.includes(doc, '[data-ice="description"]', 'this is static p1 desc.');
      });
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(2)', function (doc) {
        _utilJs.assert.includes(doc, '#static-get-staticValue', 'public static get staticValue: number');
      });
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(3)', function (doc) {
        _utilJs.assert.includes(doc, '#static-set-staticValue', 'public static set staticValue: number');
      });
      // protected
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(4)', function (doc) {
        _utilJs.assert.includes(doc, '#static-member-p2', 'protected static p2: number');
      });
      // private
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(5)', function (doc) {
        _utilJs.assert.includes(doc, '#static-member-p3', 'private static p3: number');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has static method detail.', function () {
    (0, _utilJs.find)(doc, '[data-ice="staticMethodDetails"]', function (doc) {
      // public
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '#static-method-staticMethod1', 'public static staticMethod1');
        _utilJs.assert.includes(doc, '[data-ice="description"]', 'this is staticMethod1 desc.');
      });
      // protected
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(2)', function (doc) {
        _utilJs.assert.includes(doc, '#static-method-staticMethod2', 'protected static staticMethod2');
      });
      // private
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(3)', function (doc) {
        _utilJs.assert.includes(doc, '#static-method-staticMethod3', 'private static staticMethod3');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has constructor detail.', function () {
    (0, _utilJs.find)(doc, '[data-ice="constructorDetails"]', function (doc) {
      // public
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-constructor-constructor', 'public constructor(p1: number)');
        _utilJs.assert.includes(doc, '#instance-constructor-constructor + [data-ice="description"]', 'this is constructor desc.');

        (0, _utilJs.find)(doc, '#instance-constructor-constructor ~ [data-ice="properties"]', function (doc) {
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 number this is p1 desc.');
        });
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has member detail.', function () {
    (0, _utilJs.find)(doc, '[data-ice="memberDetails"]', function (doc) {
      // public p1
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-member-p1', 'public p1: number');
        _utilJs.assert.includes(doc, '#instance-member-p1 + [data-ice="description"]', 'this is p1 desc.');
      });

      // public p5
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(2)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-member-p5', 'public p5: number');
      });

      // public value
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(5)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-get-value', 'public get value: number');
      });

      // public value
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(6)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-set-value', 'public set value: number');
      });

      // protected p2
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(7)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-member-p2', 'protected p2: number');
      });

      // private p3
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(8)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-member-p3', 'private p3: number');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  it('has method detail.', function () {
    (0, _utilJs.find)(doc, '[data-ice="methodDetails"]', function (doc) {
      // public
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(1)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-method-method1', 'public abstract method1(p1: number[], p2: number, p3: number, p4: number | string[], p5: number, p6: number, p7: {a: number, b: string}, p8: Object, p9: MyClass2 | MyClass3[] | {a: number, b: string}): Object');
        _utilJs.assert.includes(doc, '#instance-method-method1 [data-ice="version"]', 'version 0.0.1');
        _utilJs.assert.includes(doc, '#instance-method-method1 [data-ice="since"]', 'since 1.2.3');
        _utilJs.assert.includes(doc, '#instance-method-method1 ~ [data-ice="description"]', 'this is method1 desc.');

        _utilJs.assert.includes(doc, '[data-ice="deprecated"]', 'this method was deprecated.');
        _utilJs.assert.includes(doc, '[data-ice="experimental"]', 'this method is experimental.');

        (0, _utilJs.find)(doc, '#instance-method-method1 ~ [data-ice="properties"]', function (doc) {
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 number[] this is p1(simple) desc.');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 number nullable: false this is p2(not nullable) desc.');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(3)', 'p3 number nullable: true this is p3(nullable) desc.');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(4)', 'p4 number | string[] this is p4(union) desc.');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(5)', 'p5 number optional this is p5(optional) desc.');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(6)', 'p6 number optional default: 123 this is p6(default) desc.');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(7)', 'p7 {a: number, b: string} this is p7(object) desc.');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(8)', 'p8 Object this is p8(nest) desc.');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(9)', 'p8.a number this is p8.a(nest) desc.');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(10)', 'p8.b string this is p8.b(nest) desc.');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(11)', 'p9 MyClass2 | MyClass3[] | {a: number, b: string} nullable: false this is p9(complex) desc. this is second line.');
        });

        (0, _utilJs.find)(doc, '[data-ice="returnParams"]', function (doc) {
          _utilJs.assert.includes(doc, '[data-ice="returnType"]', 'Object');
          _utilJs.assert.includes(doc, '[data-ice="returnDescription"]', 'this is return desc.');

          (0, _utilJs.find)(doc, '[data-ice="returnProperties"]', function (doc) {
            _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 number this is p1 of return desc.');
            _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 string[] this is p2 of return desc.');
          });
        });

        (0, _utilJs.find)(doc, '[data-ice="see"]', function (doc) {
          _utilJs.assert.includes(doc, 'li:nth-child(1)', 'http://example.com');
          _utilJs.assert.includes(doc, 'li:nth-child(1) a', 'http://example.com', 'href');
        });

        (0, _utilJs.find)(doc, '[data-ice="todo"]', function (doc) {
          _utilJs.assert.includes(doc, 'li:nth-child(1)', 'this is todo1');
        });

        (0, _utilJs.find)(doc, '[data-ice="emitWrap"]', function (doc) {
          _utilJs.assert.includes(doc, '[data-ice="emit"]:nth-of-type(1)', 'MyEvent1 this is emits MyEvent1 desc.');
          _utilJs.assert.includes(doc, '[data-ice="emit"]:nth-of-type(2)', 'MyEvent2 this is emits MyEvent2 desc.');

          _utilJs.assert.includes(doc, '[data-ice="emit"]:nth-of-type(1) a', 'class/src/MyEvent.js~MyEvent1.html', 'href');
          _utilJs.assert.includes(doc, '[data-ice="emit"]:nth-of-type(2) a', 'http://example.com', 'href');
        });

        (0, _utilJs.find)(doc, '[data-ice="listenWrap"]', function (doc) {
          _utilJs.assert.includes(doc, '[data-ice="listen"]:nth-of-type(1)', 'MyEvent1 this is listens MyEvent1 desc.');
          _utilJs.assert.includes(doc, '[data-ice="listen"]:nth-of-type(2)', 'MyEvent2 this is listens MyEvent2 desc.');

          _utilJs.assert.includes(doc, '[data-ice="listen"]:nth-of-type(1) a', 'class/src/MyEvent.js~MyEvent1.html', 'href');
          _utilJs.assert.includes(doc, '[data-ice="listen"]:nth-of-type(2) a', 'http://example.com', 'href');
        });

        (0, _utilJs.find)(doc, '[data-ice="throwWrap"]', function (doc) {
          _utilJs.assert.includes(doc, '[data-ice="throw"]:nth-of-type(1)', 'MyError1 this is throws MyError1 desc.');
          _utilJs.assert.includes(doc, '[data-ice="throw"]:nth-of-type(2)', 'MyError2 this is throws MyError2 desc.');

          _utilJs.assert.includes(doc, '[data-ice="throw"]:nth-of-type(1) a', 'class/src/MyError.js~MyError1.html', 'href');
          _utilJs.assert.includes(doc, '[data-ice="throw"]:nth-of-type(2) a', 'http://example.com', 'href');
        });
      });

      // public method5
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(2)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-method-method5', 'public method5(p1: number, p2: string, p3: *[]): number');
        (0, _utilJs.find)(doc, '#instance-method-method5 ~ [data-ice="properties"]', function (doc) {
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 number optional default: 123');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 string optional default: abc');
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(3)', 'p3 *[] optional default: []');
        });

        (0, _utilJs.find)(doc, '[data-ice="returnParams"]', function (doc) {
          _utilJs.assert.includes(doc, '[data-ice="returnType"]', 'number');
        });
      });

      // public method6
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(3)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-method-method6', 'public method6(p1: *)');
        (0, _utilJs.find)(doc, '#instance-method-method6 ~ [data-ice="properties"]', function (doc) {
          _utilJs.assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 *');
        });
      });

      // protected method2
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(4)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-method-method2', 'protected method2()');
      });

      // private _method7
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(5)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-method-_method7', 'private _method7()');
      });

      // private method3
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(6)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-method-method3', 'private method3()');
      });

      // private method4
      (0, _utilJs.find)(doc, '[data-ice="detail"]:nth-of-type(7)', function (doc) {
        _utilJs.assert.includes(doc, '#instance-method-method4', 'private * method4(): Generator');
      });
    });
  });
});