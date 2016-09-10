/**
 * this is TestSubclassIndirect.
 */
export default class TestSubclassIndirect {}

/**
 * this is TestSubclassIndirectInner1.
 */
export class TestSubclassIndirectInner1 extends TestSubclassIndirect {}

/**
 * this is TestSubclassIndirectInner2.
 */
export class TestSubclassIndirectInner2 extends TestSubclassIndirectInner1 {}
