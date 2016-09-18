import {readDoc as _readDoc, assert, cli, consoleLogSwitch} from '../../util.js';

/** @test {DocResolver#_resolveAccess} */
describe('test config.autoPrivate:', ()=>{
  consoleLogSwitch(false);
  cli('./test/fixture-config/esdoc-autoPrivate.json');
  consoleLogSwitch(true);

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-autoPrivate');
  }

  it('treat _class as public', ()=>{
    const doc = readDoc('class/src/Access/Class.js~_TestAccessClassAutoPrivate.html');
    assert.includes(doc, '.self-detail [data-ice="name"]', '_TestAccessClassAutoPrivate');
  });

  it('treat _method as public', ()=>{
    const doc = readDoc('class/src/Access/Method.js~TestAccessMethod.html');
    assert.includes(doc, '#instance-method-_method4', 'public _method4()');
  });

  it('treat _member as public', ()=>{
    const doc = readDoc('class/src/Access/Property.js~TestAccessProperty.html');
    assert.includes(doc, '#instance-member-_p4', 'public _p4: number');
  });

  it('treat _function as public', ()=>{
    const doc = readDoc('function/index.html');
    assert.includes(doc, '#static-function-_testAccessFunctionAutoPrivate', 'public _testAccessFunctionAutoPrivate()');
  });

  it('treat _variable as public', ()=>{
    const doc = readDoc('variable/index.html');
    assert.includes(doc, '#static-variable-_testAccessVariableAutoPrivate', 'public _testAccessVariableAutoPrivate: number');
  });
});
