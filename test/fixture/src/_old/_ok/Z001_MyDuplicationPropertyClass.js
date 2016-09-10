/**
 * this is MyDuplicationPropertyClass desc.
 */
class Z001_MyDuplicationPropertyClass {
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

  /** this is on click */
  onClick(){}
}

