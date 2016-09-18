/**
 * this is TestExtendsExpressionInner.
 */
function TestExtendsExpressionInner(){}

/**
 * this is TestExtendsExpression.
 */
export default class TestExtendsExpression extends TestExtendsExpressionInner(123) {
  method1(){}
}
