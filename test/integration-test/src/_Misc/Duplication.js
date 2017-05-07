export class TestDuplication {
  constructor() {
    /** @type {number} */
    this.member = 1;

    /** @type {string} */
    this.member = 'b';

    /** @type {boolean} */
    this.member = true;
  }
}
