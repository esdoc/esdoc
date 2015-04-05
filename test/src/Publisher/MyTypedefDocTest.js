import {readDoc, assert, find} from './util.js';

describe('MyTypedef:', ()=> {
  let doc = readDoc('@typedef.html');
  let encode = encodeURIComponent;

  it('has summary.', ()=>{
    find(doc, '[data-ice="summary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static MyTypedef1: Object this is MyTypedef1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', encode('@typedef.html') + '#static-typedef-MyTypedef1', 'href');
    });
  });

  it('has detail.', ()=> {
    find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=> {
      assert.includes(doc, '#static-typedef-MyTypedef1', 'public static MyTypedef1: Object');
    });
  });
});
