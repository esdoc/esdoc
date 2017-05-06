export class TestParamDestructuring {
  /**
   * @param {number[]} p
   * @param {number} p[0]
   * @param {number} p[1]
   */
  methodArray([p1, p2]){}

  /**
   * @param {Object} p
   * @param {number} p.p1
   * @param {string} p.p2
   */
  methodObject({p1, p2}){}
}
