export default class TestNameComputed {
  constructor(){
    this[foo.bar] = 123;
  }

  [foo.baz]() { }
}
