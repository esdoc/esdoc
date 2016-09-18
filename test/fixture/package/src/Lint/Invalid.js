/**
 * this is TestLintInvalid.
 */
export default class TestLintInvalid {
  /**
   * this is method1.
   * @param {number} x
   */
  method1(p){}

  /**
   * this is method2.
   * @param {number} x1
   * @param {number[]} x2
   * @param {Object} x3
   */
  method2(p1 = 10, p2 = [1,2,3], p3 = {foo:1, bar: 2}){}

  /**
   * this is method3.
   * @param {number[]} x
   */
  method3(...p){}

  /**
   * this is method4.
   * @param {Object} o
   */
  method4({p1, p2}, {p3, p4}){}
}
