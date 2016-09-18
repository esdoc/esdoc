/**
 * this is TestThrowsMethod.
 */
export default class TestThrowsMethod {
  /**
   * this is method1.
   * @throws {TestThrowsMethodError1} throw error if foo.
   * @throws {TestThrowsMethodError2} throw error if bar.
   */
  method1(){}
}

/**
 * this is TestThrowsMethodError1.
 */
export class TestThrowsMethodError1 {}

/**
 * this is TestThrowsMethodError2.
 */
export class TestThrowsMethodError2 {}
