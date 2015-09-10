import SuperMyClass1 from './OtherClass/SuperMyClass.js';

/**
 * this is MyClass1 desc.
 * this is second line.
 *
 * this is third line.
 *
 * ```html
 * <div>text</div>
 * <ul>
 *   <li>item1</li>
 *   <li>item2</li>
 *   <li>item3</li>
 * </ul>
 * ```
 *
 * - item1
 * - item2
 * - item3
 *
 * ```js
 * let foo = 'this is code block'
 * ```
 *
 * | Left align | Right align | Center align |
 * |:-----------|------------:|:------------:|
 * | This       |        This |     This     |
 * | column     |      column |    column    |
 *
 * @implements {MyInterface1}
 * @implements {XMLHttpRequest}
 *
 * @example <caption>This is example caption</caption>
 * let foo = 10;
 * let bar = 20;
 * @example
 * for (let v of values) {
 *   let foo = v;
 * }
 * @deprecated use MyClass1Ex instead of this class.
 * @experimental this class is dangerous.
 * @todo this is todo1
 * @todo this is todo2
 * @see http://example.com
 * @see {@link MyClass2}
 * @see {@link SuperMyClass1#superMethod}
 * @since 1.2.3
 * @version 0.0.1
 * @foobar this is unknown tag.
 */
export default class MyClass1 extends SuperMyClass1 {
  /**
   * this is staticValue(get) desc.
   * @type {number}
   */
  static get staticValue() {
  }

  /**
   * this is staticValue(set) desc.
   * @type {number}
   */
  static set staticValue(v) {
  }

  /**
   * this is staticMethod1 desc.
   */
  static staticMethod1() {
    /**
     * this is static p1 desc.
     * @type {number}
     */
    this.p1 = 123;

    /**
     * this is static p2 desc.
     * @type {number}
     * @protected
     */
    this.p2 = 123;

    /**
     * this is static p3 desc.
     * @type {number}
     * @private
     */
    this.p3 = 123;
  }

  /**
   * this is staticMethod2 desc.
   * @protected
   */
  static staticMethod2() {
  }

  /**
   * this is staticMethod3 desc.
   * @private
   */
  static staticMethod3() {
  }

  /**
   * this is constructor desc.
   * @param {number} p1 - this is p1 desc.
   */
  constructor(p1) {
    super(p1);

    /**
     * this is p1 desc.
     * @type {number}
     */
    this.p1 = p1;

    /**
     * this is p2 desc.
     * @type {number}
     * @protected
     */
    this.p2 = p1;

    /**
     * this is p3 desc.
     * @type {number}
     * @private
     */
    this.p3 = p1;

    /**
     * this is p4 desc.
     * @type {function}
     * @private
     */
    this.p4 = ()=>{};

    // this is undocument
    this.p5 = 123;
    this.p6 = {};
    this.p7 = null;

    // this is undocument
    const prop = 'p999';
    this[prop] = 123;
  }

  /**
   * this is value(get) desc.
   * @type {number}
   */
  get value() {
  }

  /**
   * this is value(set) desc.
   * @type {number}
   */
  set value(v) {
  }

  /**
   * this is method1 desc.
   * @param {number[]} p1 this is p1(simple) desc.
   * @param {!number} p2 this is p2(not nullable) desc.
   * @param {?number} p3 this is p3(nullable) desc.
   * @param {(number|string[])} p4 this is p4(union) desc.
   * @param {number} [p5] this is p5(optional) desc.
   * @param {number} [p6=123] this is p6(default) desc.
   * @param {{a: number, b: string}} p7 this is p7(object) desc.
   * @param {Object} p8 this is p8(nest) desc.
   * @param {number} p8.a this is p8.a(nest) desc.
   * @param {string} p8.b this is p8.b(nest) desc.
   * @param {!(MyClass2|MyClass3[]|{a: number, b: string})} p9 - this is p9(complex) desc.
   * this is second line.
   *
   * @return {Object} this is return desc.
   * @property {number} p1 this is p1 of return desc.
   * @property {string[]} p2 this is p2 of return desc.
   *
   * @deprecated
   * @experimental
   * @todo this is todo1
   * @see http://example.com
   *
   * @since 1.2.3
   * @version 0.0.1
   *
   * @abstract
   * @override
   * @throws {MyError1} this is throws MyError1 desc.
   * @throws {MyError2} this is throws MyError2 desc.
   * @emits {MyEvent1} this is emits MyEvent1 desc.
   * @emits {MyEvent2} this is emits MyEvent2 desc.
   * @listens {MyEvent1} this is listens MyEvent1 desc.
   * @listens {MyEvent2} this is listens MyEvent2 desc.
   */
  method1(p1, p2, p3, p4, p5, p6, p7, p8, p9) {
  }

  /**
   * this is method2 desc.
   * @protected
   */
  method2(){}

  /**
   * this is method3 desc.
   * @private
   */
  method3(){}

  /**
   * this is method4 desc.
   * @return {Generator}
   * @private
   */
  * method4(){}

  method5(p1 = 123, p2 = 'abc', p3 = []) {
    return 123;
  }

  // this is undocument
  method6(p1){
  }

  /**
   * this is auto private.
   */
  _method7(){}

  /**
   * @param {Array.<number>} p1
   * @param {Map.<string, boolean>} p2
   * @param {Promise.<MyClass2, Error>} p3
   * @param {function(a: number, b: string[], c: Map.<string, boolean>, d: {e: number, f: Map.<string, boolean>}): boolean} p4
   * @param {{a: number, b: string[], c: Map.<string, boolean>, d: {e: number, f: Map.<string, boolean>}}} p5
   * @param {Map<Map<string, boolean>, Map<string, boolean>>} p6
   * @return {Set.<MyClass3>}
   * @private
   */
  method8(p1, p2, p3, p4, p5, p6){}

  /**
   * @private
   * @param {number}
   */
  method999Invalid(p1){}
}

/**
 * this is MyClass2 desc.
 */
export class MyClass2 extends MyClass1 {
  /**
   * this is method1.
   */
  method1({p1, p2}, {p3, p4, p5} = {p3: 123, p4: 'abc'}) {}
}

/**
 * this is MyClass3 desc.
 */
class MyClass3 extends MyClass2 {
}

/**
 * this is MyClass4 desc.
 * @interface
 */
class MyClass4 {
}

/**
 * this is MyClass5 desc.
 * @implements {MyClass1}
 */
class MyClass5 {
}

/**
 * this is MyClass6 desc.
 */
class MyClass6 extends MyClass5 {
}

/**
 * this is myClass7 desc.
 */
let MyClass7 = class {
  /**
   * this is method1 desc.
   */
  method1(){}
};

/**
 * this is myClass8 desc.
 */
global.MyClass8 = class {
  /**
   * this is method1 desc.
   */
  method1(){}
};

/**
 * this is MyClass999 desc.
 * @ignore
 */
export class MyClass999 {
}

/**
 * this is desc of a class to test computed property names.
 */
class MyClass10 {
  [foo](){}
  [foo.bar](){}
  [foo.bar.baz](){}
  [foo + bar](){}
  [foo()](){}
}

/**
 * object destructuring used to fail.
 * @see https://github.com/esdoc/esdoc/issues/65
 */
let {xxx, yyy, zzz} = obj;

/**
 * array destructuring used to fail.
 * @see https://github.com/esdoc/esdoc/issues/76
 */
let [xxx, yyy, zzz] = [1, 2, 3];
