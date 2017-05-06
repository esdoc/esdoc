export default class TestParamAttribute {
  // default
  /**
   * @param {number} [p1=123]
   * @param {string[]} [p2=[]]
   * @param {Foo} [p3 = new Foo()]
   */
  methodDefault(p1 = 123, p2 = [], p3 = new Foo()){}

  // nullable
  /**
   * @param {?number} p1
   * @param {!string} p2
   */
  methodNullable(p1, p2){}

  // optional
  /**
   * @param {number} [p1]
   */
  methodOptional(p1){}
}
