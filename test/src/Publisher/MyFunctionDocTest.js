import {readDoc, assert, find} from './util.js';

describe('MyFunction:', ()=>{
  let doc = readDoc('@function.html');
  let encode = encodeURIComponent;

  it('has summary.', ()=>{
    find(doc, '[data-ice="summary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static myFunction1() this is myFunction1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public static myFunction2(p1: number, p2: string) this is myFunction2 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public static myFunction3(): number this is myFunction3 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public static myFunction4(p1: number, p2: string): number this is myFunction4 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public static myFunction5(p1: number, p2: string): Object this is myFunction5 desc.');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', encode('@function.html') + '#static-function-myFunction1', 'href');
    });
  });

  it('has detail.', ()=>{
    find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction1', 'public static myFunction1()');
      assert.includes(doc, '[data-ice="importPath"]', "import myFunction1 from 'esdoc-test-fixture/src/myFunction.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction2', 'public static myFunction2(p1: number, p2: string)');
      assert.includes(doc, '[data-ice="importPath"]', "import {myFunction2} from 'esdoc-test-fixture/src/myFunction.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction3', 'public static myFunction3(): number');
      assert.includes(doc, '[data-ice="importPath"]', "import {myFunction3} from 'esdoc-test-fixture/src/myFunction.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(4)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction4', 'public static myFunction4(p1: number, p2: string): number');
    });

    find(doc, '[data-ice="detail"]:nth-of-type(5)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction5', 'public static myFunction5(p1: number, p2: string): Object');
    });
  });
});
