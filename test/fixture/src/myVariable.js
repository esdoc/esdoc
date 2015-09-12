/**
 * this is myVariable1 desc.
 * @type {Object}
 * @property {number} p1 this is p1 desc.
 * @property {string[]} p2 this is p2 desc.
 */
export default myVariable1 = {};

/**
 * this is myVariable2 desc.
 * @type {number}
 */
export let myVariable2 = 123;

/**
 * this is myVariable3 desc.
 * @type {number}
 */
let myVariable3 = 123;

// this is undocument
export let myVariable4 = 123;
export let myVariable5 = [];

/**
 * this is myVariableSeparateExport1.
 * @type {{foo: number, bar: string}}
 */
let myVariableSeparateExport1 = {};
export default myVariableSeparateExport1;

/**
 * this is myVariableSeparateExport2.
 * @type {Object}
 * @property {number} foo - this is foo.
 * @property {string} bar - this is bar.
 */
let myVariableSeparateExport2 = {};
export {myVariableSeparateExport2};

/**
 * this is unknown type.
 * @see https://github.com/esdoc/esdoc/issues/75
 */
let myVariableZ006 = new foo.Bar();
