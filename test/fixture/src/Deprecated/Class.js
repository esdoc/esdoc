/**
 * this is TestDeprecatedClass.
 * @deprecated this is deprecated.
 */
export default class TestDeprecatedClass {
  constructor() {
    /**
     * this is p1.
     * @type {number}
     * @deprecated
     */
    this.p1 = 123;
  }

  /**
   * this is method1.
   * @deprecated
   */
  method1(){}
}
