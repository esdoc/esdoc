import {readDoc, assert, find} from './../../util.js';

/** @test {ClassDoc#@interface} */
describe('TestInterfaceDefinition', ()=> {
  const doc = readDoc('class/src/Interface/Definition.js~TestInterfaceDefinition.html');

  it('has interface mark.', ()=> {
    assert.includes(doc, '.header-notice [data-ice="kind"]', 'interface');
  });

  it('has direct subclass.', ()=>{
    find(doc, '.self-detail [data-ice="directImplemented"]', (doc)=>{
      assert.includes(doc, 'a[href="class/src/Interface/Implements.js~TestInterfaceImplements.html"]', 'TestInterfaceImplements');
    });
  });
});
