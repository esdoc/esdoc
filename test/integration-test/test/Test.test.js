import assert from 'assert';
import {find} from '../util';

describe('test/Test.js:', ()=>{
  it('has describe/', ()=>{
    const doc = find('longname', 'test/Test.js~describe0');
    assert.equal(doc.testId, 0);
    assert.equal(doc.testDepth, 0);
    assert.equal(doc.description, 'describe/');
    assert.deepEqual(doc.testTargets, ['TestTarget1']);
  });

  it('has describe/it', ()=>{
    const doc = find('longname', 'test/Test.js~describe0.it1');
    assert.equal(doc.testId, 1);
    assert.equal(doc.testDepth, 1);
    assert.equal(doc.description, 'describe/it');
    assert.deepEqual(doc.testTargets, ['TestTarget2']);
  });

  it('has describe/describe', ()=>{
    const doc = find('longname', 'test/Test.js~describe0.describe2');
    assert.equal(doc.testId, 2);
    assert.equal(doc.testDepth, 1);
    assert.equal(doc.description, 'describe/describe/');
    assert.deepEqual(doc.testTargets, ['TestTarget3']);
  });

  it('has describe/describe/it', ()=>{
    const doc = find('longname', 'test/Test.js~describe0.describe2.it3');
    assert.equal(doc.testId, 3);
    assert.equal(doc.testDepth, 2);
    assert.equal(doc.description, 'describe/describe/it');
    assert.deepEqual(doc.testTargets, ['TestTarget4']);
  });

  it('has describe/context/it', ()=>{
    const doc = find('longname', 'test/Test.js~describe0.context4.it5');
    assert.equal(doc.testId, 5);
    assert.equal(doc.testDepth, 2);
    assert.equal(doc.description, 'describe/context/it');
    assert.deepEqual(doc.testTargets, ['TestTarget6']);
  });

  it('has suite/', ()=>{
    const doc = find('longname', 'test/Test.js~suite6');
    assert.equal(doc.testId, 6);
    assert.equal(doc.testDepth, 0);
    assert.equal(doc.description, 'suite/');
    assert.deepEqual(doc.testTargets, ['TestTarget7']);
  });

  it('has suite/test', ()=>{
    const doc = find('longname', 'test/Test.js~suite6.test7');
    assert.equal(doc.testId, 7);
    assert.equal(doc.testDepth, 1);
    assert.equal(doc.description, 'suite/test');
    assert.deepEqual(doc.testTargets, ['TestTarget8']);
  });

  it('has suite/suite/', ()=>{
    const doc = find('longname', 'test/Test.js~suite6.suite8');
    assert.equal(doc.testId, 8);
    assert.equal(doc.testDepth, 1);
    assert.equal(doc.description, 'suite/suite/');
    assert.deepEqual(doc.testTargets, ['TestTarget9']);
  });

  it('has suite/suite/test', ()=>{
    const doc = find('longname', 'test/Test.js~suite6.suite8.test9');
    assert.equal(doc.testId, 9);
    assert.equal(doc.testDepth, 2);
    assert.equal(doc.description, 'suite/suite/test');
    assert.deepEqual(doc.testTargets, ['TestTarget10']);
  });
});


