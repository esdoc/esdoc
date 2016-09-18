/**
 * this is TestListensMethod.
 */
export default class TestListensMethod {
  /**
   * this is method1.
   * @listens {TestListensMethodEvent1} listen event because foo.
   * @listens {TestListensMethodEvent2} listen event because bar.
   */
  method1(){}
}

/**
 * this is TestListensMethodEvent1.
 */
export class TestListensMethodEvent1 {}

/**
 * this is TestListensMethodEvent2.
 */
export class TestListensMethodEvent2 {}
