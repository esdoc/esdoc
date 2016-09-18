import TestAbstractDefinition from './Definition';

/**
 * this is TestAbstractOverride
 */
export default class TestAbstractOverride extends TestAbstractDefinition {
  /**
   * this is override method1.
   * @override
   */
  method1(){}

  /**
   * this is override method2 with automatically detection.
   */
  method2(){}
}
