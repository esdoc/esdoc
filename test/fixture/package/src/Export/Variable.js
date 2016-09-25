/**
 * this is testExportVariable1.
 * @type {Object}
 * @property {number} p1 - this is p1.
 * @property {string[]} p2 - this is p2.
 */
export default testExportVariable1 = {};

/**
 * this is testExportVariable2.
 * @type {number}
 */
export const testExportVariable2 = 123;

/**
 * this is testExportVariable3.
 * @type {number}
 */
const testExportVariable3 = 123;

// this is undocument
export const testExportVariable4 = 123;
export const testExportVariable5 = [];

/**
 * this is testExportVariable6.
 * @type {Object}
 * @property {number} p1 - this is p1.
 * @property {string} p2 - this is p2.
 */
const testExportVariable6 = {};
export {testExportVariable6};

/**
 * this is testExportVariable7 with unknown type.
 * @see https://github.com/esdoc/esdoc/issues/75
 */
export const testExportVariable7 = new foo.Bar();
