// default export
export default class TestExportClass1 {}

// named export
export class TestExportClass2 {}

// indirect export with declaration
class TestExportClass3 {}
export {TestExportClass3};

// indirect export with expression
const TestExportClass4 = class {};
export {TestExportClass4};

// non export
class TestExportClass5 {}

// multiple named export
class TestExportClass6 {}
class TestExportClass7 {}
export {TestExportClass6, TestExportClass7};

