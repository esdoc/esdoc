/**
 * this is TestGuessParam.
 */
export default class TestGuessParam {
  method1(p1 = 123, p2 = "text"){}

  method2(p1 = [123, 456], p2 = {x1: "text", x2: true}){}

  method3([p1, p2] = [123, 456]){}

  method4({x1, x2} = {x1: 123, x2: "text"}){}
}
