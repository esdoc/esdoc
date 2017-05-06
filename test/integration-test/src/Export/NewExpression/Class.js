// new expression default export
class TestExportNewExpression1 {}
export default new TestExportNewExpression1();

// new expression named export (1)
class TestExportNewExpression2 {}
export const testExportNewExpression2 = new TestExportNewExpression2();

// new expression named export (2)
export class TestExportNewExpression3 {}
export const testExportNewExpression3 = new TestExportNewExpression3();

// new expression named export (3)
export const testExportNewExpression4 = new foo.Bar();
