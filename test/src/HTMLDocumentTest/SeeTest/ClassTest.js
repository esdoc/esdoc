import {readDoc, assert, find, findParent} from './../../util.js';

/** @test {AbstractDoc#@see} */
describe('TestSeeClass', ()=> {
  const doc = readDoc('class/src/See/Class.js~TestSeeClass.html');

  it('has see from class.', ()=> {
    find(doc, '.self-detail [data-ice="see"]', (doc)=>{
      assert.includes(doc, 'a[href="http://foo.example.com"]', 'http://foo.example.com');
      assert.includes(doc, 'a[href="http://bar.example.com"]', 'http://bar.example.com');
    });
  });

  it('has see from constructor.', ()=>{
    findParent(doc, '[id="instance-constructor-constructor"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="see"] a[href="http://example.com"]', 'http://example.com');
    });
  });

  it('has see from member.', ()=>{
    findParent(doc, '[id="instance-member-p1"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="see"] a[href="http://example.com"]', 'http://example.com');
    });
  });

  it('has see from method.', ()=>{
    findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="see"] a[href="http://example.com"]', 'http://example.com');
    });
  });
});
