import {readDoc, assert, find} from './util.js';

describe('MyClass1: ', ()=> {
  let doc = readDoc('@class-src|MyClass.js~MyClass1.html');
  let encode = encodeURIComponent;

  it('has header notice.', ()=>{
    find(doc, '[data-ice="content"] .header-notice', (doc)=>{
      assert.includes(doc, '[data-ice="importPath"]', "import MyClass1 from 'esdoc-test-fixture'");
      assert.includes(doc, '[data-ice="access"]', 'public');
      assert.includes(doc, '[data-ice="kind"]', 'class');
      assert.includes(doc, '[data-ice="source"]', 'source');
      assert.includes(doc, '[data-ice="source"] a', encode('@file-src|MyClass.js.html') + '#lineNumber42', 'href');
      assert.includes(doc, '[data-ice="version"]', 'version 0.0.1');
      assert.includes(doc, '[data-ice="since"]', 'since 1.2.3');
    });
  });

  it('has self detail.', ()=>{
    find(doc, '[data-ice="content"] .self-detail', (doc)=>{
      assert.includes(doc, '[data-ice="name"]', 'MyClass1');

      assert.includes(doc, '[data-ice="extendsChain"]', 'XMLHttpRequest → SuperMyClass2 → SuperMyClass1 → MyClass1');
      assert.includes(doc, '[data-ice="extendsChain"] span:nth-of-type(1) a', 'https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest', 'href');
      assert.includes(doc, '[data-ice="extendsChain"] span:nth-of-type(2) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass2.html'), 'href');
      assert.includes(doc, '[data-ice="extendsChain"] span:nth-of-type(3) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html'), 'href');

      assert.includes(doc, '[data-ice="directSubclass"]', 'MyClass2');
      assert.includes(doc, '[data-ice="directSubclass"] span:nth-of-type(1) a', encode('@class-src|MyClass.js~MyClass2.html'), 'href');

      assert.includes(doc, '[data-ice="indirectSubclass"]', 'MyClass3');
      assert.includes(doc, '[data-ice="indirectSubclass"] span:nth-of-type(1) a', encode('@class-src|MyClass.js~MyClass3.html'), 'href');

      assert.includes(doc, '[data-ice="implements"]', 'MyInterface1, XMLHttpRequest');
      assert.includes(doc, '[data-ice="implements"] li:nth-of-type(1) a', encode('@class-src|MyInterface.js~MyInterface1.html'), 'href');
      assert.includes(doc, '[data-ice="implements"] li:nth-of-type(2) a', 'https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest', 'href');

      assert.includes(doc, '[data-ice="indirectImplements"]', 'MyInterface2, MyInterface3');
      assert.includes(doc, '[data-ice="indirectImplements"] li:nth-of-type(1) a', encode('@class-src|MyInterface.js~MyInterface2.html'), 'href');
      assert.includes(doc, '[data-ice="indirectImplements"] li:nth-of-type(2) a', encode('@class-src|MyInterface.js~MyInterface3.html'), 'href');

      assert.includes(doc, '[data-ice="directImplemented"]', 'MyClass5');
      assert.includes(doc, '[data-ice="directImplemented"] span:nth-of-type(1) a', encode('@class-src|MyClass.js~MyClass5.html'), 'href');

      assert.includes(doc, '[data-ice="indirectImplemented"]', 'MyClass6');
      assert.includes(doc, '[data-ice="indirectImplemented"] span:nth-of-type(1) a', encode('@class-src|MyClass.js~MyClass6.html'), 'href');

      assert.includes(doc, '[data-ice="description"]', 'this is MyClass1 desc.');

      assert.includes(doc, '[data-ice="deprecated"]', 'this class was deprecated. use MyClass1Ex instead of this class.');
      assert.includes(doc, '[data-ice="experimental"]', 'this class is experimental. this class is dangerous.');

      find(doc, '[data-ice="see"]', (doc)=>{
        assert.includes(doc, 'li:nth-child(1)', 'http://example.com');
        assert.includes(doc, 'li:nth-child(1) a', 'http://example.com', 'href');

        assert.includes(doc, 'li:nth-child(2)', 'MyClass2');
        assert.includes(doc, 'li:nth-child(2) a', encode('@class-src|MyClass.js~MyClass2.html'), 'href');

        assert.includes(doc, 'li:nth-child(3)', 'SuperMyClass1#superMethod');
        assert.includes(doc, 'li:nth-child(3) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html') + '#instance-method-superMethod', 'href');
      });

      find(doc, '[data-ice="todo"]', (doc)=>{
        assert.includes(doc, 'li:nth-child(1)', 'this is todo1');
        assert.includes(doc, 'li:nth-child(2)', 'this is todo2');
      });
    });
  });

  it('has static member summary.', ()=>{
    find(doc, '[data-ice="staticMemberSummary"]', (doc)=>{

      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static p1: number this is static p1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', encode('@class-src|MyClass.js~MyClass1.html') + '#static-member-p1', 'href');
      });

      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public static get staticValue: number this is staticValue(get) desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(2) [data-ice="name"] a', encode('@class-src|MyClass.js~MyClass1.html') + '#static-get-staticValue', 'href');
      });

      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public static set staticValue: number this is staticValue(set) desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(3) [data-ice="name"] a', encode('@class-src|MyClass.js~MyClass1.html') + '#static-set-staticValue', 'href');
      });

      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected static p2: number this is static p2 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', encode('@class-src|MyClass.js~MyClass1.html') + '#static-member-p2', 'href');
      });
    });
  });

  it('has static method summary.', ()=>{
    find(doc, '[data-ice="staticMethodSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static staticMethod1() this is staticMethod1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('@class-src|MyClass.js~MyClass1.html') + '#static-method-staticMethod1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected static staticMethod2()');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private static staticMethod3()');
      });
    });
  });

  it('has constructor summary.', ()=>{
    find(doc, '[data-ice="constructorSummary"]', (doc)=>{
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public constructor(p1: number) this is constructor desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', encode('@class-src|MyClass.js~MyClass1.html') + '#instance-constructor-constructor', 'href');
      });
    });
  });

  it('has member summary.', ()=>{
    find(doc, '[data-ice="memberSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public p1: number this is p1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', encode('@class-src|MyClass.js~MyClass1.html') + '#instance-member-p1', 'href');
      });

      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public get value: number this is value(get) desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(2) [data-ice="name"] a', encode('@class-src|MyClass.js~MyClass1.html') + '#instance-get-value', 'href');
      });

      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public set value: number this is value(set) desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(3) [data-ice="name"] a', encode('@class-src|MyClass.js~MyClass1.html') + '#instance-set-value', 'href');
      });

      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected p2');
      });

      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private p3');
      });
    });
  });

  it('has method summary.', ()=>{
    find(doc, '[data-ice="methodSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public abstract method1(p1: number[], p2: number, p3: number, p4: number | string[], p5: number, p6: number, p7: {a: number, b: string}, p8: Object, p9: MyClass2 | MyClass3[] | {a: number, b: string}): Object');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this method was deprecated.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this method is experimental.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this is method1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="version"]', 'version 0.0.1');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="since"]', 'since 1.2.3');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', encode('@class-src|MyClass.js~MyClass1.html') + '#instance-method-method1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected method2() this is method2 desc.');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private method3() this is method3 desc.');
      });
    });
  });

  it('has inherited summary.', ()=>{
    find(doc, '[data-ice="inheritedSummary"] [data-ice="summary"]:nth-of-type(1)', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static get ultraStaticValue');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass2.html') + '#static-get-ultraStaticValue', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public static set ultraStaticValue');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(2) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass2.html') + '#static-set-ultraStaticValue', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public static ultraP1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3) [data-ice="name"] a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass2.html') + '#static-member-ultraP1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public static ultraStaticMethod()');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass2.html') + '#static-method-ultraStaticMethod', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public get ultraValue');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(5) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass2.html') + '#instance-get-ultraValue', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(6)', 'public set ultraValue');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(6) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass2.html') + '#instance-set-ultraValue', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(7)', 'public ultraP1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(7) [data-ice="name"] a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass2.html') + '#instance-member-ultraP1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(8)', 'public ultraMethod()');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(8) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass2.html') + '#instance-method-ultraMethod', 'href');
    });

    find(doc, '[data-ice="inheritedSummary"] [data-ice="summary"]:nth-of-type(2)', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static get superStaticValue');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html') + '#static-get-superStaticValue', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public static set superStaticValue');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(2) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html') + '#static-set-superStaticValue', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public static superP1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3) [data-ice="name"] a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html') + '#static-member-superP1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public static superStaticMethod()');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html') + '#static-method-superStaticMethod', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public get superValue');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(5) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html') + '#instance-get-superValue', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(6)', 'public set superValue');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(6) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html') + '#instance-set-superValue', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(7)', 'public superP1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(7) [data-ice="name"] a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html') + '#instance-member-superP1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(8)', 'public method1()');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(8) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html') + '#instance-method-method1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(9)', 'public superMethod()');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(9) a', encode('@class-src|OtherClass|SuperMyClass.js~SuperMyClass1.html') + '#instance-method-superMethod', 'href');
    });
  });

  it('has static member detail.', ()=>{
    find(doc, '[data-ice="staticMemberDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#static-member-p1', 'public static p1: number');
        assert.includes(doc, '[data-ice="description"]', 'this is static p1 desc.');
      });
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#static-get-staticValue', 'public static get staticValue: number');
      });
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#static-set-staticValue', 'public static set staticValue: number');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(4)', (doc)=>{
        assert.includes(doc, '#static-member-p2', 'protected static p2: number');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(5)', (doc)=>{
        assert.includes(doc, '#static-member-p3', 'private static p3: number');
      });
    })
  });

  it('has static method detail.', ()=>{
    find(doc, '[data-ice="staticMethodDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#static-method-staticMethod1', 'public static staticMethod1');
        assert.includes(doc, '[data-ice="description"]', 'this is staticMethod1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#static-method-staticMethod2', 'protected static staticMethod2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#static-method-staticMethod3', 'private static staticMethod3');
      });
    })
  });

  it('has constructor detail.', ()=>{
    find(doc, '[data-ice="constructorDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#instance-constructor-constructor', 'public constructor(p1: number)');
        assert.includes(doc, '#instance-constructor-constructor + [data-ice="description"]', 'this is constructor desc.');

        find(doc, '#instance-constructor-constructor ~ [data-ice="properties"]', (doc)=>{
          assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 number this is p1 desc.');
        });
      });
    })
  });

  it('has member detail.', ()=>{
    find(doc, '[data-ice="memberDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#instance-member-p1', 'public p1: number');
        assert.includes(doc, '#instance-member-p1 + [data-ice="description"]', 'this is p1 desc.');
      });
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=> {
        assert.includes(doc, '#instance-get-value', 'public get value: number');
      });
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=> {
        assert.includes(doc, '#instance-set-value', 'public set value: number');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(4)', (doc)=>{
        assert.includes(doc, '#instance-member-p2', 'protected p2: number');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(5)', (doc)=>{
        assert.includes(doc, '#instance-member-p3', 'private p3: number');
      });
    })
  });

  it('has method detail.', ()=>{
    find(doc, '[data-ice="methodDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#instance-method-method1', 'public abstract method1(p1: number[], p2: number, p3: number, p4: number | string[], p5: number, p6: number, p7: {a: number, b: string}, p8: Object, p9: MyClass2 | MyClass3[] | {a: number, b: string}): Object');
        assert.includes(doc, '#instance-method-method1 [data-ice="version"]', 'version 0.0.1');
        assert.includes(doc, '#instance-method-method1 [data-ice="since"]', 'since 1.2.3');
        assert.includes(doc, '#instance-method-method1 ~ [data-ice="description"]', 'this is method1 desc.');

        assert.includes(doc, '[data-ice="deprecated"]', 'this method was deprecated.');
        assert.includes(doc, '[data-ice="experimental"]', 'this method is experimental.');

        find(doc, '#instance-method-method1 ~ [data-ice="properties"]', (doc)=>{
          assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 number[] this is p1(simple) desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 number nullable: false this is p2(not nullable) desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(3)', 'p3 number nullable: true this is p3(nullable) desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(4)', 'p4 number | string[] this is p4(union) desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(5)', 'p5 number optional this is p5(optional) desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(6)', 'p6 number optional default: 123 this is p6(default) desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(7)', 'p7 {a: number, b: string} this is p7(object) desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(8)', 'p8 Object this is p8(nest) desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(9)', 'p8.a number this is p8.a(nest) desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(10)', 'p8.b string this is p8.b(nest) desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(11)', 'p9 MyClass2 | MyClass3[] | {a: number, b: string} nullable: false this is p9(complex) desc.this is second line.');
        });

        find(doc, '[data-ice="returnParams"]', (doc)=>{
          assert.includes(doc, '[data-ice="returnType"]', 'Object');
          assert.includes(doc, '[data-ice="returnDescription"]', 'this is return desc.');

          find(doc, '[data-ice="returnProperties"]', (doc)=>{
            assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 number this is p1 of return desc.');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 string[] this is p2 of return desc.');
          });
        });

        find(doc, '[data-ice="see"]', (doc)=>{
          assert.includes(doc, 'li:nth-child(1)', 'http://example.com');
          assert.includes(doc, 'li:nth-child(1) a', 'http://example.com', 'href');
        });

        find(doc, '[data-ice="todo"]', (doc)=>{
          assert.includes(doc, 'li:nth-child(1)', 'this is todo1');
        });

        find(doc, '[data-ice="emitWrap"]', (doc)=>{
          assert.includes(doc, '[data-ice="emit"]:nth-of-type(1)', 'MyEvent1 this is emits MyEvent1 desc.');
          assert.includes(doc, '[data-ice="emit"]:nth-of-type(2)', 'MyEvent2 this is emits MyEvent2 desc.');

          assert.includes(doc, '[data-ice="emit"]:nth-of-type(1) a', encode('@class-src|MyEvent.js~MyEvent1.html'), 'href');
          assert.includes(doc, '[data-ice="emit"]:nth-of-type(2) a', 'http://example.com', 'href');
        });

        find(doc, '[data-ice="listenWrap"]', (doc)=>{
          assert.includes(doc, '[data-ice="listen"]:nth-of-type(1)', 'MyEvent1 this is listens MyEvent1 desc.');
          assert.includes(doc, '[data-ice="listen"]:nth-of-type(2)', 'MyEvent2 this is listens MyEvent2 desc.');

          assert.includes(doc, '[data-ice="listen"]:nth-of-type(1) a', encode('@class-src|MyEvent.js~MyEvent1.html'), 'href');
          assert.includes(doc, '[data-ice="listen"]:nth-of-type(2) a', 'http://example.com', 'href');
        });

        find(doc, '[data-ice="throwWrap"]', (doc)=>{
          assert.includes(doc, '[data-ice="throw"]:nth-of-type(1)', 'MyError1 this is throws MyError1 desc.');
          assert.includes(doc, '[data-ice="throw"]:nth-of-type(2)', 'MyError2 this is throws MyError2 desc.');

          assert.includes(doc, '[data-ice="throw"]:nth-of-type(1) a', encode('@class-src|MyError.js~MyError1.html'), 'href');
          assert.includes(doc, '[data-ice="throw"]:nth-of-type(2) a', 'http://example.com', 'href');
        });
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#instance-method-method2', 'protected method2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#instance-method-method3', 'private method3');
      });
    })
  });
});
