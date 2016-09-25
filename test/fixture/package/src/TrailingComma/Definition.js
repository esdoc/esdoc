/**
 * this is TestTrailingCommaDefinition.
 */
export default class TestTrailingCommaDefinition {
  /**
   * this is method1.
   * @param {number} p1 - this is p1.
   * @param {string} p2 - this is p2.
   */
  method1(p1, p2,) {}

  /**
   * this is method2.
   */
  method2(){
    this.method1(1, 'abc',);
  }
}
