/**
 * this is SuperMyClass2 desc.
 * @implements MyInterface3
 */
export class SuperMyClass2 extends XMLHttpRequest{
  /**
   */
  static get ultraStaticValue(){}

  /**
   */
  static set ultraStaticValue(v){}

  /**
   */
  static ultraStaticMethod(){
    /**
     * @type {number}
     */
    this.ultraP1 = 123;
  }

  /**
   */
  get ultraValue(){}

  /**
   */
  set ultraValue(v){}

  /**
   */
  ultraMethod(){
    /**
     * @type {number}
     */
    this.ultraP1 = 123;
  }
}
/**
 * this is SuperMyClass1.
 * @implements MyInterface2
 */
export default class SuperMyClass1 extends SuperMyClass2 {
  /**
   */
  static get superStaticValue(){}

  /**
   */
  static set superStaticValue(v){}

  /**
   */
  static superStaticMethod(){
    /**
     * @type {number}
     */
    this.superP1 = 123;
  }

  /**
   */
  get superValue(){}

  /**
   */
  set superValue(v){}

  /**
   */
  superMethod(){
    /**
     * @type {number}
     */
    this.superP1 = 123;
  }

  /**
   * this is method1 desc.
   */
  method1(){}
}
