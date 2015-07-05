/**
 * this is MyExport1.
 * @example
 * let myExport1 = new MyExport1();
 */
class MyExport1 {
  /** this is method1. */
  method1(){}
}

/**
 * this is MyExport1 instance.
 * @example
 * myExport.method1();
 */
export default MyExport1;

/**
 * this is MyExport2.
 */
class MyExport2 {
  /** this is method1. */
  method1(){}
}

/**
 * this is MyExport2 instance.
 */
export default new MyExport2();

/**
 * this is MyExport3.
 */
class MyExport3 {
  /** this is method1. */
  method1(){}
}
let myExport3 = new MyExport3();
/**
 * this is MyExport3 instance.
 */
export default myExport3;

/**
 * this is MyExport4.
 */
class MyExport4 {
  /** this is method1. */
  method1(){}
}

/**
 * this is MyExport5.
 */
class MyExport5 {
  /** this is method1. */
  method1(){}
}

/**
 * this is MyExport6.
 */
class MyExport6 {
  /** this is method1. */
  method1(){}
}

let myExport4 = new MyExport4();
let myExport5 = new MyExport5();

/** this is multiple export */
export {myExport4, myExport5, MyExport6};

/**
 * this is MyExport9.
 */
class MyExport9 {
  /** this is method1. */
  method1(){}
}

/**
 * this is MyExport99.
 */
export class MyExport99 extends MyExport9 {}

/**
 * this is MyExport10.
 */
class MyExport10 {
  /** this is method1. */
  method1() {}
}

/**
 * this is MyExport10 instance.
 */
export let myExport10 = new MyExport10();
