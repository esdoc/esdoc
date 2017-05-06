export default class TestParamGuess {
  // literal default
  methodLiteral(p1 = 123){}

  // identifier default
  methodIdentifier(p1 = value){}

  // new expression default
  methodNewExpression(p1 = new Foo()){}

  // array default
  methodArray(p1 = [123, 456]){}

  // array destructuring
  methodArrayDestructuring([p1, p2]){}

  // array default and destructuring
  methodArrayAndDestructuring([p1, p2] = [123, 456]){}

  // object default
  methodObject(p1 = {x1: "text", x2: true}){}

  // object destructuring
  methodObjectDestructuring({x1, x2}){}

  // object default and destructuring
  methodObjectAndDestructuring({x1, x2} = {x1: 123, x2: "text"}){}

  // spread
  methodSpread(...p1){}

  // array destructuring and partial default
  methodArrayDestructuringAndPartialDefault([p1, p2 = 10, p3 = null, p4 = 'text', p5 = v]){}
}

