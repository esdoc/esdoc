/**
 * @ignore
 * @param a
 * @param b
 */
function mixin(a, b){}

export class TestExtendsMixinInner1 {
  /**
   * this is method1.
   */
  method1(){}
}

export class TestExtendsMixinInner2 {
  /**
   * this is method2.
   */
  method2(){}
}

/**
 * this is TestExtendsMixin.
 */
export default class TestExtendsMixin extends mixin(TestExtendsMixinInner1, TestExtendsMixinInner2) {
  /**
   * this is method3.
   */
  method3(){}
}
