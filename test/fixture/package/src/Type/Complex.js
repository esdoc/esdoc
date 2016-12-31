export default class TestTypeComplex {
  // function
  /**
   * this is method1.
   * @param {function(x1: number[], x2: Map<string, boolean>): Object} p1 - this is p1.
   */
  method1(p1){}

  // generics
  /**
   * this is method2.
   * @param {Map<number, string[]>} p1 - this is p1.
   */
  method2(p1){}

  // record
  /**
   * this is method3.
   * @param {{x1: number[], x2: Map<string, boolean>, x3: {y1: number, y2: string}}} p1 - this is p1.
   */
  method3(p1){}

  // union
  /**
   * this is method4.
   * @param {?(number|string)} p1 - this is p1.
   * @param {!(number|string)} p2 - this is p2.
   */
  method4(p1, p2){}

  // union in generics
  /**
   * this is method5.
   * @param {Promise<string|number, Error>} p1 - this is p1.
   */
  method5(p1){}

  // union with spread
  /**
   * this is method6.
   * @param {...(number|string)} p1 - this is p1.
   */
  method6(...p1){}
}
