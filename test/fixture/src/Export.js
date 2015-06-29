/**
 * this is MyExport.
 */
class MyExport1 {
  method1(){}
}
export default MyExport1;

/**
 * this is MyExport2.
 */
class MyExport2 {
  method1(){}
}
export default new MyExport2();

/**
 * this is MyExport3.
 */
class MyExport3 {
  method1(){}
}
let myExport3 = new MyExport3();
export default myExport3;

/**
 * this is MyExport4.
 */
class MyExport4 {
  method1(){}
}

/**
 * this is MyExport5.
 */
class MyExport5 {
  method1(){}
}

/**
 * this is MyExport6.
 */
class MyExport6 {
  method1(){}
}

let myExport4 = new MyExport4();
let myExport5 = new MyExport5();
export {myExport4, myExport5, MyExport6};

/**
 * this is MyExport9.
 */
class MyExport9 {
  method1(){}
}

/**
 * this is MyExport99.
 */
export class MyExport99 extends MyExport9 {}
