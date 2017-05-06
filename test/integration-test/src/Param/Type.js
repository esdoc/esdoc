export default class TestParam {
  // array
  /**
   * @param {number[]} p1
   */
  methodArray(p1){}

  // class
  /**
   * @param {TestParamClassInner} p1
   */
  methodClass(p1){}

  // external
  /**
   * @param {ArrayBuffer} p1
   */
  methodExternal(p1){}

  // function
  /**
   * @param {function(x1: number, x2: string): boolean} p1
   */
  methodFunction(p1){}

  // generics
  /**
   * @param {Array<number>} p1
   * @param {Map<number, string>} p2
   * @param {Promise<number[], Error>} p3
   */
  methodGenerics(p1, p2, p3){}

  // literal
  /**
   * @param {number} p1
   */
  methodLiteral(p1){}

  // object
  /**
   * @param {Object} p1
   * @param {number} p1.x1
   */
  methodObject(p1){}

  // record
  /**
   * @param {{x1: number, x2: string}} p1
   */
  methodRecord(p1){}

  // spread
  /**
   * @param {...number} p1
   */
  methodSpread(...p1){}

  // typedef
  /**
   * @param {TestTypeTypedefInner} p1
   */
  methodTypedef(p1){}

  // union
  /**
   * @param {number|string} p1
   */
  methodUnion(p1){}
}

export class TestParamClassInner {}

/**
 * @external {ArrayBuffer} http://example.com
 */

/**
 * @typedef {Object} TestTypeTypedefInner
 */

