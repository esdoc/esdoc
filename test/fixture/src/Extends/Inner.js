class _TestExtendsInner {
  /**
   * this is method1.
   */
  method1(){}

  /**
   * this is method2.
   */
  method2(){}
}

/**
 * this is TestExtendsInner.
 */
export default class TestExtendsInner extends _TestExtendsInner {
  /**
   * this is method1 with override.
   */
  method1(){}

  /**
   * this is method3.
   */
  method3(){}
}
