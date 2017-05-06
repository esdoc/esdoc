export default class TestListensClass {
  /**
   * @listens {TestListensEvent1}
   * @listens {TestListensEvent2} listens TestListensEvent2
   */
  methodListens(){}
}

export class TestListensEvent1 {}
export class TestListensEvent2 {}
