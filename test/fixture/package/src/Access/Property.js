/**
 * this is TestAccessProperty.
 */
export default class TestAccessProperty {
  constructor() {
    /**
     * this is p1.
     * @public
     * @type {number}
     */
    this.p1 = 123;

    /**
     * this is p2.
     * @protected
     * @type {number}
     */
    this.p2 = 123;

    /**
     * this is p3.
     * @private
     * @type {number}
     */
    this.p3 = 123;

    /**
     * this is _p4.
     * @type {number}
     */
    this._p4 = 123;
  }
}
