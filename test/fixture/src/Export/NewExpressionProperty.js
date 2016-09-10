/**
 * this is TestNewExpressionProperty.
 */
class TestNewExpressionProperty {}

const obj = {};
obj.TestNewExpressionProperty = TestNewExpressionProperty;

/**
 * this is instance of TestNewExpressionProperty.
 */
export default new obj.TestNewExpressionProperty();
