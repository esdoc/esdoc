/**
 * @emits {InputEvent} input
 * @emits {MouseEvent} click emits class event when click.
 * @emits {CustomEvent} foobar - emits class event when foobar.
 */
export default class TestEmitsClass {
  /**
   * @emits {Event} foo - emits event when foo.
   * @emits {Event} bar emits event when bar.
   */
  methodEmits(){}
}

/**
 * @emits {Event} fizz
 */
export function testEmitsFunction(){}
