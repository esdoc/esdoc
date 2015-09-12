/**
 * this is MyComputedMethodClass.
 */
export default class Z002_MyComputedMethodClass {
  /** this is ['foo'] */
  ['foo'](){}

  /** this is */
  [Symbol.iterator]() { }

  /** this is [foo] */
  [foo](){}

  /** this is [foo.bar.baz] */
  [foo.bar.baz](){}

  /** this is [foo + bar] */
  [foo + bar](){}

  /** this is [foo.p + bar] */
  [foo.p + bar](){}

  /** this is [foo()] */
  [foo()](){}

  /** this is [foo.bar()] */
  [foo.bar()](){}

  /** this is [`${foo}`] */
  [`${foo}`](){}
}
