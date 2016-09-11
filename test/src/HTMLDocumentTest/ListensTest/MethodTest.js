import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@listens} */
describe('TestListensMethod', ()=> {
  const doc = readDoc('class/src/Listens/Method.js~TestListensMethod.html');

  it('has listens.', ()=>{
    findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
      findParent(doc, 'a[href="class/src/Listens/Method.js~TestListensMethodEvent1.html"]', '[data-ice="listen"]', (doc)=>{
        assert.includes(doc, null, 'TestListensMethodEvent1 listen event because foo.');
        assert.includes(doc, 'a[href="class/src/Listens/Method.js~TestListensMethodEvent1.html"]', 'TestListensMethodEvent1');
      });

      findParent(doc, 'a[href="class/src/Listens/Method.js~TestListensMethodEvent2.html"]', '[data-ice="listen"]', (doc)=>{
        assert.includes(doc, null, 'TestListensMethodEvent2 listen event because bar.');
        assert.includes(doc, 'a[href="class/src/Listens/Method.js~TestListensMethodEvent2.html"]', 'TestListensMethodEvent2');
      });
    });
  });
});
