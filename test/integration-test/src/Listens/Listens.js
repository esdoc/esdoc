/**
 * @listens {*} scroll
 * @listens {MouseEvent} click listens for click
 * @listens {InputEvent} input - listens for input
 */
export default class TestListensClass {
  /**
   * @listens {Event} foo
   * @listens {CustomEvent} bar listens for custom bar
   * @listens {*} bang - listens for any bang
   */
  methodListens(){}
}
