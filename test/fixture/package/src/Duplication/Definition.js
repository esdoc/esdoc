/**
 * this is TestDuplicationDefinition.
 */
export default class TestDuplicationDefinition {
  /**
   * this is constructor.
   */
  constructor() {
    this.value = 10;

    this.onClick = this.onClick.bind(this);
  }

  /**
   * this is set value.
   * @type {number}
   */
  set value(v){}

  /**
   * this is get value.
   * @type {number}
   */
  get value(){}

  /**
   * this is onClick.
   * @param {number} p - this is p.
   */
  onClick(p){}
}
