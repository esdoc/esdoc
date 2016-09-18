/**
 * this is TestInterfaceImplements.
 * @implements {TestInterfaceDefinition}
 * @implements {TestInterfaceImplementsInner}
 */
export default class TestInterfaceImplements {
  /**
   * this is implements method1.
   */
  method1(){}

  /**
   * this is implements method2.
   */
  method2(){}
}

/**
 * this is TestInterfaceImplementsInner
 * @interface
 */
export class TestInterfaceImplementsInner {
  /**
   * this is interface method2.
   */
  method2(){}
}
