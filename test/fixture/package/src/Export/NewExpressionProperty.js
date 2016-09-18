/**
 * this is TestExportNewExpressionProperty.
 */
class TestExportNewExpressionProperty {}

const obj = {};
obj.TestExportNewExpressionProperty = TestExportNewExpressionProperty;

/**
 * this is instance of TestExportNewExpressionProperty.
 */
export default new obj.TestExportNewExpressionProperty();
