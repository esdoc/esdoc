export class TestExtendsDeepShape extends Array {
  static get staticValueShape(){}

  static set staticValueShape(v){}

  static staticMethodShape(){
    this.staticPShape = 123;
  }

  get valueShape(){}

  set valueShape(v){}

  methodShape() {
    this.pShape = 123;
  }
}

export class TestExtendsDeepRectangle extends TestExtendsDeepShape {
  static get staticValueRectangle(){}

  static set staticValueRectangle(v){}

  static staticMethodRectangle(){
    this.staticPRectangle = 123;
  }

  get valueRectangle(){}

  set valueRectangle(v){}

  methodRectangle(){
    this.pRectangle = 123;
  }
}

export default class TestExtendsDeepSquare extends TestExtendsDeepRectangle {
  static get staticValueSquare(){}

  static set staticValueSquare(v){}

  static staticMethodSquare(){
    this.staticPSquare = 123;
  }

  get valueSquare(){}

  set valueSquare(v){}

  methodSquare(){
    this.pSquare = 123;
  }
}
