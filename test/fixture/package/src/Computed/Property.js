/**
 * this is TestComputedProperty
 */
export default class TestComputedProperty {
  /**
   * this is constructor.
   */
  constructor(){
    /**
     * this is foo.
     * @type {number}
     */
    this['foo'] = 123;

    /**
     * this is iterator.
     * @type {number}
     */
    this[Symbol.iterator] = 123;

    /**
     * this is [foo].
     * @type {number}
     */
    this[foo] = 123;

    /**
     * this is [foo.bar].
     * @type {number}
     */
    this[foo.bar] = 123;

    /**
     * this is [foo.bar.baz].
     * @type {number}
     */
    this[foo.bar.baz] = 123;

    /**
     * this is [foo + bar].
     * @type {number}
     */
    this[foo + bar] = 123;

    /**
     * this is [foo.p + bar].
     * @type {number}
     */
    this[foo.p + bar] = 123;

    /**
     * this is [foo()].
     * @type {number}
     */
    this[foo()] = 123;

    /**
     * this is [foo.bar()].
     * @type {number}
     */
    this[foo.bar()] = 123;

    /**
     * this is [`${foo}`].
     * @type {number}
     */
    this[`${foo}`] = 123;
  }
}

/**
 * @ignore
 */
const foo = '';

/**
 * @ignore
 */
const bar = '';
