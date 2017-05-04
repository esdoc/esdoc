// through object
class TestExportNewExpressionProperty {}
const obj = {};
obj.TestExportNewExpressionProperty = TestExportNewExpressionProperty;
export default new obj.TestExportNewExpressionProperty();
