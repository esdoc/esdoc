import {readDoc, assert, find, findParent} from './../../../util.js';

/**
 * @test {ClassDocBuilder#_buildClassDoc}
 * @test {DocBuilder#_buildDetailDocs}
 */
describe('TestDecoratorDefinition:', ()=> {
  const doc = readDoc('class/src/Decorator/Definition.js~TestDecoratorDefinition.html');

  it('has decorator at class.', ()=>{
    find(doc, '[data-ice="content"] .self-detail', (doc)=>{
      assert.includes(doc, '[data-ice="decorator"]', 'testDecoratorAnnotation1');
    });
  });

  it('has decorator at static method.', ()=>{
    findParent(doc, '[id="static-method-method1"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="decorator"]', 'testDecoratorAnnotation1');
    });
  });

  it('has decorator at getter.', ()=>{
    findParent(doc, '[id="instance-get-value1"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="decorator"]', 'testDecoratorAnnotation1');
    });
  });

  it('has decorator at setter.', ()=>{
    findParent(doc, '[id="instance-set-value2"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="decorator"]', 'testDecoratorAnnotation1');
    });
  });

  it('has decorator at method.', ()=>{
    findParent(doc, '[id="instance-method-method1"]', '[data-ice="detail"]', (doc)=>{
      assert.includes(doc, '[data-ice="decorator"] li:nth-of-type(1)', 'testDecoratorAnnotation1');
      assert.includes(doc, '[data-ice="decorator"] li:nth-of-type(2)', 'testDecoratorAnnotation2(true)');
    });
  });
});
