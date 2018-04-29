export default class TestAccessMember {
  constructor() {
    /**
     * @public
     * @type {number}
     */
    this.mPublic = 123;

    /**
     * @protected
     * @type {number}
     */
    this.mProtected = 123;

    /**
     * @package
     * @type {number}
     */
    this.mPackage = 123;

    /**
     * @private
     * @type {number}
     */
    this.mPrivate = 123;
  }
}
