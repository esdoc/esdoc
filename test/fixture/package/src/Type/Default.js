/**
 * this is TestTypeDefault.
 */
export default class TestTypeDefault {
  /**
   * this is method1.
   * @param {number} [p1=123] - this is default number p1.
   * @param {string[]} [p2=[]] - this is default string array p2.
   */
  method1(p1 = 123, p2 = []){}

  /**
   * this is method2.
   * @param {Foo} [p1 = new Foo()] - this is default object p1.
   */
  method2(p1 = new Foo()){}
}
