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

  /** @type {number} */
  set value(v){}

  /** @type {number} */
  get value(){}

  /** this is onClick */
  onClick(){}
}
