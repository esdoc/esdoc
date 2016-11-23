/**
 * this is TestDecoratorDefinition.
 */
@testDecoratorAnnotation1
export default class TestDecoratorDefinition {
  /**
   * this is static method1.
   */
  @testDecoratorAnnotation1
  static method1(){}

  /**
   * this is get value1.
   * @type {number}
   */
  @testDecoratorAnnotation1
  get value1(){}

  /**
   * this is set value2.
   * @type {number}
   */
  @testDecoratorAnnotation1
  set value2(v){}

  /**
   * this is method1.
   */
  @testDecoratorAnnotation1
  @testDecoratorAnnotation2(true)
  method1(){}
}

/**
 * this is testDecoratorAnnotation1.
 */
export function testDecoratorAnnotation1(){}

/**
 * this is testDecoratorAnnotation2.
 */
export function testDecoratorAnnotation2(){}
