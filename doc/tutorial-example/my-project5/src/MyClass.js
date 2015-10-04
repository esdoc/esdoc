import MySuperClass from './MySuperClass.js';

/**
 * this is MyClass description.
 */
export default class MyClass extends MySuperClass {
  /**
   * this is MyClass constructor description.
   * @param {string} [name="anonymous"] - this is name description.
   */
  constructor(name = 'anonymous') {
    super();
    this._name = name;
  }

  /**
   * this is sayMyName description
   * @returns {string} this is return description.
   */
  sayMyName() {
    return `My name is ${this._name}`;
  }
}
