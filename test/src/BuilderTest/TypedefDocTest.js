import {readDoc, assert, find} from './../util.js';

/** @testTarget {SingleDocBuilder} */
describe('MyTypedef:', ()=> {
  let doc = readDoc('typedef/index.html');

  /** @testTarget {SingleDocBuilder#_buildSingleDoc} */
  it('has summary.', ()=>{
    find(doc, '[data-ice="summary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public MyTypedef1: Object this is MyTypedef1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');
    });
  });

  /** @testTarget {SingleDocBuilder#_buildSingleDoc} */
  it('has detail.', ()=> {
    find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=> {
      assert.includes(doc, '#static-typedef-MyTypedef1', 'public MyTypedef1: Object');
    });
  });
});
