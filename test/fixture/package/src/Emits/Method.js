/**
 * this is TestEmitsMethod.
 */
export default class TestEmitsMethod {
  /**
   * this is method1.
   * @emits {TestEmitsMethodEvent1} emits event when foo.
   * @emits {TestEmitsMethodEvent2} emits event when bar.
   */
  method1(){}
}

export class TestEmitsMethodEvent1 {}

export class TestEmitsMethodEvent2 {}
