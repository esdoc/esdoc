import {readDoc, assert, find} from './../util.js';

describe('Anonymous', ()=>{
  /**
   * @test {ClassDoc#@_name}
   */
  describe('Anonymous Class',()=>{
    let doc = readDoc('class/src/nMyAnonymous.js~nMyAnonymous.html');

    it('has anonymous class', ()=>{
      assert.includes(doc, '.self-detail [data-ice="name"]', 'nMyAnonymous');
    });
  });

  /**
   * @test {FunctionDoc#@_name}
   */
  describe('Anonymous Function',()=>{
    let doc = readDoc('function/index.html');

    it('has anonymous function', ()=>{
      assert.includes(doc, '[data-ice="summary"] [data-ice="target"]:nth-of-type(11)', 'nMyAnonymous1');
    });
  });
});
