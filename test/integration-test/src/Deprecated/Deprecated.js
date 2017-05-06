/**
 * @deprecated this is deprecated.
 */
export class TestDeprecatedClass {
  constructor() {
    /**
     * @type {number}
     * @deprecated
     */
    this.mDeprecated = 123;
  }

  /**
   * @deprecated
   */
  methodDeprecated(){}
}

/**
 * @deprecated
 */
export function testDeprecatedFunction(){}

/**
 * @deprecated
 */
export const testDeprecatedVariable = 123;
