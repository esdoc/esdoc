export default class TestEmitsClass {
  /**
   * @emits {TestEmitsEvent1} emits event when foo.
   * @emits {TestEmitsEvent2} emits event when bar.
   */
  methodEmits(){}
}

/**
 * @emits {TestEmitsEvent1}
 */
export function testEmitsFunction(){}

export class TestEmitsEvent1 {}
export class TestEmitsEvent2 {}

