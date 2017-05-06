export default class TestThrows {
  /**
   * @throws {TestThrowsError1}
   * @throws {TestThrowsError2} throws error
   */
  methodThrows(){}
}

export class TestThrowsError1 {}
export class TestThrowsError2 {}
