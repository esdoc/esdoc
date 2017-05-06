export default class TestReturnGuess {
  // literal
  methodLiteral(){
    return 123;
  }

  // array
  methodArray(){
    return [123, 456];
  }

  // object
  methodObject(){
    return {x1: 123, x2: 'text'};
  }

  // template literal
  methodTemplateLiteral(){
    return `text`;
  }
}
