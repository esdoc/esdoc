import {readDoc, assert, find} from './../util.js';

/** @test {SingleDocBuilder} */
describe('MyFunction:', ()=>{
  let doc = readDoc('function/index.html');

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has summary.', ()=>{
    find(doc, '[data-ice="summary"]', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public myFunction1() this is myFunction1 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public myFunction2(p1: number, p2: string) this is myFunction2 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public myFunction3(): number this is myFunction3 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'public myFunction4(p1: number, p2: string): number this is myFunction4 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(5)', 'public myFunction5(p1: number, p2: string): Object this is myFunction5 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(6)', 'public * myFunction6(): Generator this is myFunction6 desc.');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(7)', 'public myFunction7(p1: *[], p2: number[], p3: {}, p4: {"a": number, "b": string}): *');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(8)', 'public myFunction8(p1: *)');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'function/index.html#static-function-myFunction1', 'href');
    });
  });

  /** @test {SingleDocBuilder#_buildSingleDoc} */
  it('has detail.', ()=>{
    find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction1', 'public myFunction1()');
      assert.includes(doc, '[data-ice="importPath"]', "import myFunction1 from 'esdoc-test-fixture/out/src/myFunction.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction2', 'public myFunction2(p1: number, p2: string)');
      assert.includes(doc, '[data-ice="importPath"]', "import {myFunction2} from 'esdoc-test-fixture/out/src/myFunction.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction3', 'public myFunction3(): number');
      assert.includes(doc, '[data-ice="importPath"]', "import {myFunction3} from 'esdoc-test-fixture/out/src/myFunction.js'");
    });

    find(doc, '[data-ice="detail"]:nth-of-type(4)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction4', 'public myFunction4(p1: number, p2: string): number');
    });

    find(doc, '[data-ice="detail"]:nth-of-type(5)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction5', 'public myFunction5(p1: number, p2: string): Object');
    });

    find(doc, '[data-ice="detail"]:nth-of-type(6)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction6', 'public * myFunction6(): Generator');
    });

    find(doc, '[data-ice="detail"]:nth-of-type(7)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction7', 'public myFunction7(p1: *[], p2: number[], p3: {}, p4: {"a": number, "b": string}): *');
    });

    find(doc, '[data-ice="detail"]:nth-of-type(8)', (doc)=>{
      assert.includes(doc, '#static-function-myFunction8', 'public myFunction8(p1: *)');
    });
  });
});
