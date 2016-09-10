/**
 * this is myFunction1 desc.
 * @example <caption>This is example caption</caption>
 * let foo = 123;
 * @example
 * let bar = 456;
 */
export default function myFunction1(){
}

/**
 * this is myFunction2 desc.
 * @param {number} p1 - this is p1 desc.
 * @param {string} p2 this is p2 desc.
 */
export function myFunction2(p1, p2){
}

/**
 * this is myFunction3 desc.
 * @return {number} this is return desc.
 */
export let myFunction3 = function(){
};

/**
 * this is myFunction4 desc.
 * @param {number} p1
 * @param {string} p2
 * @return {number} this is return desc.
 */
function myFunction4(p1, p2){
}

/**
 * this is myFunction5 desc.
 * @param {number} p1
 * @param {string} p2
 * @return {Object} this is return desc.
 * @property {number} p1 - this is p1 of return value.
 */
let myFunction5 = function(p1, p2){};

/**
 * this is myFunction6 desc.
 * @return {Generator}
 */
export function* myFunction6(){}

export function myFunction7(p1 = [], p2 = [1,2,3], p3 = {}, p4 = {a: 123, b: 'abc'}) {
  return Math.PI;
}

// this is undocument
export function myFunction8(p1) {
}

/**
 * this is myFunction9 desc.
 * @param  {Object} [p1={}] p1
 * @return {Object}    this is return desc
 */
export function myFunction9(p1 = {}) {
}

/**
 * this is myFunctionSeparateExport1.
 * @param {number} p1 - this is p1.
 */
function myFunctionSeparateExport1(p1) {}
export default myFunctionSeparateExport1;

/**
 * this is myFunctionSeparateExport2.
 * @param {number} p1 - this is p1.
 */
function myFunctionSeparateExport2(p1) {}
export {myFunctionSeparateExport2};
