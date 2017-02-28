/**
 * this is TestGuessParam.
 */
export default class TestGuessParam {
  method1(p1 = 123, p2 = "text"){}

  method2(p1 = [123, 456], p2 = {x1: "text", x2: true}){}

  method3([p1, p2] = [123, 456]){}

  method4({x1, x2} = {x1: 123, x2: "text"}){}

  method5(...p1){}

  method6({x1, x2}){}

  method7(p1 = value){}

  method8(p1 = new Foo()){}

  method10([p1, p2 = 10, p3 = null, p4 = 'text', p5 = v]){}
}
