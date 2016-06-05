import {readDoc, assert, find} from './../util.js';

/** @test {SingleDocBuilder} */
describe('MyTypedef:', ()=> {
  let doc = readDoc('typedef/index.html');

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has summary.', ()=>{
    find(doc, '[data-ice="summary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public MyTypedef1: Object this is MyTypedef1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'typedef/index.html#static-typedef-MyTypedef1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public MyTypedefCallback1(p1: number, p2: string[]): function this is MyTypedefCallback1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(2) [data-ice="name"] a', 'typedef/index.html#static-typedef-MyTypedefCallback1', 'href');
    });
  });

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has detail.', ()=> {
    find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=> {
      assert.includes(doc, '#static-typedef-MyTypedef1', 'public MyTypedef1: Object');
      find(doc, '[data-ice="properties"] [data-ice="properties"]', (doc)=>{
        assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 number this is p1 desc.');
        assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 string[] this is p2 desc.');
      });
    });

    find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=> {
      assert.includes(doc, '#static-typedef-MyTypedefCallback1', 'public MyTypedefCallback1(p1: number, p2: string[]): function');
      find(doc, '[data-ice="properties"] [data-ice="properties"]', (doc)=>{
        assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 number this is p1 desc.');
        assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 string[] this is p2 desc.');
      });
    });
  });
});
