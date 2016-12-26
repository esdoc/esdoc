/**
 * this is TestGuessReturn.
 */
export default class TestGuessReturn {
  method1(){
    return 123;
  }

  method2(){
    return [123, 456];
  }

  method3(){
    return {x1: 123, x2: 'text'};
  }

  method4(){
    return `text`;
  }

  method5(){
    const obj = {}
    return {...obj}
  }
}
