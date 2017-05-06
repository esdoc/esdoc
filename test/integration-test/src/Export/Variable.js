// default export
export default testExportVariable1 = {};

// named export
export const testExportVariable2 = 123;

// non export
const testExportVariable3 = 123;

// indirect named export
const testExportVariable4 = {};
export {testExportVariable4};

// multiple named export
const testExportVariable5 = 1;
const testExportVariable6 = 1;
export {testExportVariable5, testExportVariable6};

// destructuring export
// in this case, only first variable is export. other are not export.
// todo: export other
export const [testExportVariable7, testExportVariable8] = [1, 2];
export const {testExportVariable9, testExportVariable10} = {testExportVariable9: 1, testExportVariable10: 2};
