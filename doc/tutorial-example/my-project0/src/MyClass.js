import MySuperClass from './MySuperClass.js';

export default class MyClass extends MySuperClass {
  constructor(name = 'anonymous') {
    super();
    this._name = name;
  }

  sayMyName() {
    return `My name is ${this._name}`;
  }
}
