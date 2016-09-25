/**
 * this is TestIgnoreClass1.
 * @ignore
 */
export default class TestIgnoreClass1 {
  method1(){}
}

/**
 * this is TestIgnoreClass2.
 */
export class TestIgnoreClass2 {
  /**
   * this is constructor.
   */
  constructor(){
    /**
     * this is p1.
     * @type {number}
     * @ignore
     */
    this.p1 = 123;
  }

  /**
   * this is method1.
   * @ignore
   */
  method1(){}
}
