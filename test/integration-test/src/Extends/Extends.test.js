import assert from 'assert';
import {find} from '../../util';

describe('test/Extends/Extends:', ()=>{
  it('extends builtin', ()=>{
    const doc = find('longname', 'src/Extends/Extends.js~TestExtendsBuiltin');
    assert.deepEqual(doc.extends, ['Array']);
  });

  it('extends deep', ()=>{
    const [doc1, doc2, doc3] = find('longname',
      'src/Extends/Extends.js~TestExtendsDeepShape',
      'src/Extends/Extends.js~TestExtendsDeepRectangle',
      'src/Extends/Extends.js~TestExtendsDeepSquare',
    );

    assert.deepEqual(doc1.extends, ['Array']);
    assert.deepEqual(doc2.extends, ['TestExtendsDeepShape']);
    assert.deepEqual(doc3.extends, ['TestExtendsDeepRectangle']);
  });

  it('extends expression', ()=>{
    const doc = find('longname', 'src/Extends/Extends.js~TestExtendsExpression');
    assert.deepEqual(doc.extends, ['TestExtendsExpressionInner']);
    assert.equal(doc.expressionExtends, 'TestExtendsExpressionInner(123)');
  });

  it('extends inner', ()=>{
    const doc = find('longname', 'src/Extends/Extends.js~TestExtendsInner');
    assert.deepEqual(doc.extends, ['_TestExtendsInner']);
  });

  it('extends mixin', ()=>{
    const doc = find('longname', 'src/Extends/Extends.js~TestExtendsMixin');
    assert.deepEqual(doc.extends, ['TestExtendsMixinInner1', 'TestExtendsMixinInner2']);
    assert.equal(doc.expressionExtends, 'mixin(TestExtendsMixinInner1, TestExtendsMixinInner2)');
  });

  it('extends outer', ()=>{
    const doc = find('longname', 'src/Extends/Extends.js~TestExtendsOuter');
    assert.deepEqual(doc.extends, ['src/Extends/Foo/Bar.js~Bar']);
  });

  it('extends property', ()=>{
    const doc = find('longname', 'src/Extends/Extends.js~TestExtendsProperty');
    assert.deepEqual(doc.extends, ['TestExtendsPropertyPackage~obj.TestExtendsPropertyInner']);
  });
});
