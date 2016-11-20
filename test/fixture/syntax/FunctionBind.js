function foo(){}
export default class Foo {
  method() {
    this::foo();
  }
}
