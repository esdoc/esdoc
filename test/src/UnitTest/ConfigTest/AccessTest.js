import {readDoc as _readDoc, assert, cli, consoleLogSwitch} from '../../util.js';

/** @test {DocResolver#_resolveAccess} */
describe('test config.access:', ()=>{
  consoleLogSwitch(false);
  cli('./test/fixture-config/esdoc-access.json');
  consoleLogSwitch(true);

  function readDoc(filePath) {
    return _readDoc(filePath, './test/fixture-config/esdoc-access');
  }

  describe('class', ()=>{
    it('have public class', ()=>{
      const doc = readDoc('class/src/Access/Class.js~TestAccessClassPublic.html');
      assert.includes(doc, '.self-detail [data-ice="name"]', 'TestAccessClassPublic');
    });

    it('have protected class', ()=>{
      const doc = readDoc('class/src/Access/Class.js~TestAccessClassProtected.html');
      assert.includes(doc, '.self-detail [data-ice="name"]', 'TestAccessClassProtected');
    });

    it('does not have private class', ()=>{
      assert.throws(()=>{
        readDoc('class/src/Access/Class.js~TestAccessClassPrivate.html');
      });
    });

    it('does not have auto private class', ()=>{
      assert.throws(()=>{
        readDoc('class/src/Access/Class.js~_TestAccessClassAutoPrivate.html');
      });
    });
  });

  describe('method', ()=>{
    const doc = readDoc('class/src/Access/Method.js~TestAccessMethod.html');

    it('have public method', ()=>{
      assert.includes(doc, '#instance-method-method1', 'public method1()');
    });

    it('have protected method', ()=>{
      assert.includes(doc, '#instance-method-method2', 'protected method2()');
    });

    it('does not have private method', ()=>{
      assert.throws(()=>{
        assert.includes(doc, '#instance-method-method3', 'private method3()');
      });
    });

    it('does not have auto private method', ()=>{
      assert.throws(()=>{
        assert.includes(doc, '#instance-method-_method4', 'private _method4()');
      });
    });
  });

  describe('member', ()=>{
    const doc = readDoc('class/src/Access/Property.js~TestAccessProperty.html');

    it('have public member', ()=>{
      assert.includes(doc, '#instance-member-p1', 'public p1: number');
    });

    it('have protected member', ()=>{
      assert.includes(doc, '#instance-member-p2', 'protected p2: number');
    });

    it('does not have private member', ()=>{
      assert.throws(()=>{
        assert.includes(doc, '#instance-member-p3', 'private p3: number');
      });
    });

    it('does not have auto private member', ()=>{
      assert.throws(()=>{
        assert.includes(doc, '#instance-member-_p4', 'private _p4: number');
      });
    });
  });

  describe('function', ()=>{
    const doc = readDoc('function/index.html');

    it('have public function', ()=>{
      assert.includes(doc, '#static-function-testAccessFunctionPublic', 'public testAccessFunctionPublic()');
    });

    it('have protected function', ()=>{
      assert.includes(doc, '#static-function-testAccessFunctionProtected', 'protected testAccessFunctionProtected()');
    });

    it('does not have private function', ()=>{
      assert.throws(()=>{
        assert.includes(doc, '#static-function-testAccessFunctionPrivate', 'testAccessFunctionPrivate()');
      });
    });

    it('does not have auto private function', ()=>{
      assert.throws(()=>{
        assert.includes(doc, '#static-function-_testAccessFunctionAutoPrivate', '_testAccessFunctionAutoPrivate()');
      });
    });
  });


  describe('variable', ()=>{
    const doc = readDoc('variable/index.html');

    it('have public variable', ()=>{
      assert.includes(doc, '#static-variable-testAccessVariablePublic', 'public testAccessVariablePublic: number');
    });

    it('have protected variable', ()=>{
      assert.includes(doc, '#static-variable-testAccessVariableProtected', 'protected testAccessVariableProtected: number');
    });

    it('does not have private variable', ()=>{
      assert.throws(()=>{
        assert.includes(doc, '#static-variable-testAccessVariablePrivate', 'private testAccessVariablePrivate: number');
      });
    });

    it('does not have auto private variable', ()=>{
      assert.throws(()=>{
        assert.includes(doc, '#static-variable-_testAccessVariableAutoPrivate', 'private _testAccessVariableAutoPrivate: number');
      });
    });
  });
});
