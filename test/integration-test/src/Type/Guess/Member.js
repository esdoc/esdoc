export default class TestTypeGuessMember {
  constructor() {
    // literal
    this.memberLiteral = 123;

    // array
    this.memberArray = [123, 456];

    // object
    this.memberObject = {x1: 123, x2: 'text'};

    // template literal
    this.memberTemplateLiteral= `text`;
  }
}
