export default class TestParamComplex {
  // function
  /**
   * @param {function(x1: number[], x2: Map<string, boolean>): Object} p1
   */
  methodFunction(p1){}

  // generics
  /**
   * @param {Map<number, string[]>} p1
   */
  methodGenerics(p1){}

  // record
  /**
   * @param {{x1: number[], x2: Map<string, boolean>, x3: {y1: number, y2: string}}} p1
   */
  methodRecord(p1){}

  // union
  /**
   * @param {?(number|string)} p1
   * @param {!(number|string)} p2
   */
  methodUnion(p1, p2){}

  // union in generics
  /**
   * @param {Promise<string|number, Error>} p1
   */
  methodUnionAndGenerics(p1){}

  // union with spread
  /**
   * @param {...(number|string)} p1
   */
  methodUnionAndSpread(...p1){}
}
