// extends builtin
export class TestExtendsBuiltin extends Array {}

// extends deep
export class TestExtendsDeepShape extends Array {}
export class TestExtendsDeepRectangle extends TestExtendsDeepShape {}
export class TestExtendsDeepSquare extends TestExtendsDeepRectangle {}

// extends expression
function TestExtendsExpressionInner(){}
export class TestExtendsExpression extends TestExtendsExpressionInner(123) {}

// extends inner
class _TestExtendsInner {}
export class TestExtendsInner extends _TestExtendsInner {}

// extends mixin
function mixin(a, b){}
export class TestExtendsMixinInner1 {}
export class TestExtendsMixinInner2 {}
export class TestExtendsMixin extends mixin(TestExtendsMixinInner1, TestExtendsMixinInner2) {}

// extends outer
import Bar from './Foo/Bar';
export class TestExtendsOuter extends Bar {}

// extends from property
import obj from 'TestExtendsPropertyPackage';
export class TestExtendsProperty extends obj.TestExtendsPropertyInner {}
