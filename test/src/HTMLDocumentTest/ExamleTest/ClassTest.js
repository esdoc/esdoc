import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@example} */
describe('TestExampleClass', ()=> {
  const doc = readDoc('class/src/Example/Class.js~TestExampleClass.html');

  describe('in self detail', ()=> {
    it('has example.', ()=> {
      assert.includes(doc, '.self-detail [data-ice="exampleDoc"]:nth-of-type(1)', 'const foo = 123; console.log(foo);');
      assert.includes(doc, '.self-detail [data-ice="exampleDoc"]:nth-of-type(2)', 'const bar = 123; console.log(bar);');
    });
  });

  describe('in details', ()=>{
    it('has example.', ()=>{
      findParent(doc, '[id="instance-constructor-constructor"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="exampleDoc"]', 'const foo = 123;');
      });

      findParent(doc, '[id="instance-member-p1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="exampleDoc"]', 'const foo = 123;');
      });

      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        assert.includes(doc, '[data-ice="exampleDoc"]', 'const foo = 123;');
      });
    });
  });
});
