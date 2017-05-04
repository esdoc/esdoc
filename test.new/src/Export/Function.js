// default export
export default function testExportFunction1(){}

// named export
export function testExportFunction2(){}

// named export with expression
export const testExportFunction3 = function(){};

// non export
function testExportFunction4(){}

// non export with expression
const testExportFunction5 = function(){};

// indirect named export
function testExportFunction6() {}
export {testExportFunction6};

// multiple named export
function testExportFunction7() {}
function testExportFunction8() {}
export {testExportFunction7, testExportFunction8};
