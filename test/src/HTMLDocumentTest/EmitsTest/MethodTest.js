import {readDoc, assert, findParent} from './../../util.js';

/** @test {AbstractDoc#@emits} */
describe('TestEmitsMethod', ()=> {
  const doc = readDoc('class/src/Emits/Method.js~TestEmitsMethod.html');

  describe('in details', ()=>{
    it('has desc.', ()=>{
      findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
        findParent(doc, '[data-ice="emit"] [href$="TestEmitsMethodEvent1.html"]', '[data-ice="emit"]', (doc)=>{
          assert.includes(doc, 'a', 'TestEmitsMethodEvent1');
          assert.includes(doc, 'a', 'class/src/Emits/Method.js~TestEmitsMethodEvent1.html', 'href');
          assert.includes(doc, null, 'TestEmitsMethodEvent1 emits event when foo');
        });

        findParent(doc, '[data-ice="emit"] [href$="TestEmitsMethodEvent2.html"]', '[data-ice="emit"]', (doc)=>{
          assert.includes(doc, 'a', 'TestEmitsMethodEvent2');
          assert.includes(doc, 'a', 'class/src/Emits/Method.js~TestEmitsMethodEvent2.html', 'href');
          assert.includes(doc, null, 'TestEmitsMethodEvent2 emits event when bar');
        });
      });
    });
  });
});
