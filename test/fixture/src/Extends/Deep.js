export class TestExtendsDeepShape extends Array {
  static get staticValueShape(){}

  static set staticValueShape(v){}

  static staticMethodShape(){
    this.staticPShape = 123;
  }

  get valueShape(){}

  set valueShape(v){}

  staticMethod() {
    this.staticP = 123;
  }
}

export class TestExtendsDeepRectangle extends TestExtendsShape {
  static get staticValueRectangle(){}

  static set staticValueRectangle(v){}

  static staticMethodRectangle(){
    this.staticPRectangle = 123;
  }

  static get valueRectangle(){}

  static set valueRectangle(v){}

  static methodRectangle(){
    this.pRectangle = 123;
  }
}

export default class TestExtendsDeepSquare extends TestExtendsDeepRectangle {
  static get staticValueSquare(){}

  static set staticValueSquare(v){}

  static staticMethodSquare(){
    this.staticPSquare = 123;
  }

  static get valueSquare(){}

  static set valueSquare(v){}

  static methodSquare(){
    this.pSquare = 123;
  }
}
