/**
 * this is TestComputedMethod
 */
export default class TestComputedMethod {
  /**
   * this is foo.
   */
  ['foo'](){}

  /**
   * this is iterator.
   */
  [Symbol.iterator]() { }

  /**
   * this is [foo].
   */
  [foo](){}

  /**
   * this is [foo.bar.baz].
   */
  [foo.bar.baz](){}

  /**
   * this is [foo + bar].
   */
  [foo + bar](){}

  /**
   * this is [foo.p + bar].
   */
  [foo.p + bar](){}

  /**
   * this is [foo()].
   */
  [foo()](){}

  /**
   * this is [foo.bar()].
   */
  [foo.bar()](){}

  /**
   * this is [`${foo}`].
   */
  [`${foo}`](){}

  /**
   * this is *[foo.bar]
   */
  *[foo.bar](){}
}

/**
 * @ignore
 */
const foo = '';

/**
 * @ignore
 */
const bar = '';
