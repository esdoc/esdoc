import SuperMyClass from './OtherClass/SuperMyClass.js';

/**
 * this is MyClass1 desc.
 * this is second line.
 * @example
 * let foo = 10;
 * let bar = 20;
 * @example
 * for (let v of values) {
 *   let foo = v;
 * }
 */
export default class MyClass1 extends SuperMyClass {
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
   * this is staticMethod desc.
   */
  static staticMethod() {
  }

  /**
   * this is constructor desc.
   * @param {number} p1 - this is p1 desc.
   */
  constructor(p1) {
    super(p1);

    /**
     * this is _p1 desc.
     * @type {number}
     * @private
     */
    this._p1 = p1;
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
   * this is method desc.
   * @param {number} p1 this is p1(simple) desc.
   * @param {!number} p2 this is p2(not nullable) desc.
   * @param {?number} p3 this is p3(nullable) desc.
   * @param {(number|string[])} p4 this is p4(union) desc.
   * @param {number} [p5] this is p5(optional) desc.
   * @param {number} [p6=123] this is p4(default) desc.
   * @param {{a: number, b: string}} p7 this is p7(object) desc.
   * @param {Object} p8 this is p8(nest) desc.
   * @param {number} p8.a this is p8.a(nest) desc.
   * @param {string} p8.b this is p8.b(nest) desc.
   * @param {!(number|string[]|{a: number, b: string})} p9 - this is p9(complex) desc.
   * this is second line.
   *
   * @return {Object} this is return desc.
   * @property {number} p1 this is p1 of return desc.
   * @property {string[]} p2 this is p2 of return desc.
   */
  method(p1, p2, p3, p4, p5, p6, p7, p8, p9) {
  }
}
