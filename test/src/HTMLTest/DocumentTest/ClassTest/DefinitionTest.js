import {readDoc, assert, find} from './../../../util.js';

/** @test {ClassDocBuilder} */
describe('TestClassDefinition:', ()=> {
  const doc = readDoc('class/src/Class/Definition.js~TestClassDefinition.html');

  /** @test {DocBuilder#_getTitle} */
  describe('in title:', ()=>{
    it('has document title', ()=> {
      assert.includes(doc, 'head title', 'TestClassDefinition | ESDoc Test Fixture API Document');
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  describe('in header', ()=>{
    it('has header notice.', ()=> {
      find(doc, '[data-ice="content"] .header-notice', (doc)=> {
        assert.includes(doc, '[data-ice="importPath"]', "import TestClassDefinition from 'esdoc-test-fixture'");
        assert.includes(doc, '[data-ice="access"]', 'public');
        assert.includes(doc, '[data-ice="kind"]', 'class');
        assert.includes(doc, '[data-ice="source"]', 'source');
        assert.includes(doc, '[data-ice="source"] a', 'file/src/Class/Definition.js.html#lineNumber4', 'href');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  describe('in detail', ()=>{
    it('has self detail.', ()=>{
      find(doc, '[data-ice="content"] .self-detail', (doc)=>{
        assert.includes(doc, '[data-ice="name"]', 'TestClassDefinition');
        assert.includes(doc, '[data-ice="description"]', 'this is TestClassDefinition.');
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  describe('in summary', ()=>{
    it('has static member', ()=>{
      find(doc, '[data-ice="staticMemberSummary"]', (doc)=>{
        find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
          assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static p1: number this is static p1.');
          assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'class/src/Class/Definition.js~TestClassDefinition.html#static-member-p1', 'href');
        });
      });
    });

    it('has static method.', ()=>{
      find(doc, '[data-ice="staticMethodSummary"]', (doc)=>{
        find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
          assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public static method1() this is static method1.');
          assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', 'class/src/Class/Definition.js~TestClassDefinition.html#static-method-method1', 'href');
        });
      });
    });

    it('has constructor.', ()=>{
      find(doc, '[data-ice="constructorSummary"]', (doc)=>{
        find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
          assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public constructor() this is constructor.');
          assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'class/src/Class/Definition.js~TestClassDefinition.html#instance-constructor-constructor', 'href');
        });
      });
    });

    it('has member.', ()=>{
      find(doc, '[data-ice="memberSummary"]', (doc)=>{
        find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=> {
          assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public p1: number this is p1.');
          assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'class/src/Class/Definition.js~TestClassDefinition.html#instance-member-p1', 'href');

          assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public get value1: number this is get value1.');
          assert.includes(doc, '[data-ice="target"]:nth-of-type(2) [data-ice="name"] a', 'class/src/Class/Definition.js~TestClassDefinition.html#instance-get-value1', 'href');

          assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public set value2: number this is set value2.');
          assert.includes(doc, '[data-ice="target"]:nth-of-type(3) [data-ice="name"] a', 'class/src/Class/Definition.js~TestClassDefinition.html#instance-set-value2', 'href');
        });
      });
    });

    it('has method summary.', ()=>{
      find(doc, '[data-ice="methodSummary"]', (doc)=>{
        find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
          assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public method1() this is method1.');
          assert.includes(doc, '[data-ice="target"]:nth-of-type(1) [data-ice="name"] a', 'class/src/Class/Definition.js~TestClassDefinition.html#instance-method-method1', 'href');
        });
      });
    });
  });

  /** @test {ClassDocBuilder#_buildClassDoc} */
  describe('in detail', ()=>{
    it('has static member.', ()=>{
      find(doc, '[data-ice="staticMemberDetails"]', (doc)=>{
        find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
          assert.includes(doc, '#static-member-p1', 'public static p1: number');
          assert.includes(doc, '[data-ice="description"]', 'this is static p1.');
        });
      })
    });

    it('has static method.', ()=>{
      find(doc, '[data-ice="staticMethodDetails"]', (doc)=>{
        find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
          assert.includes(doc, '#static-method-method1', 'public static method1()');
          assert.includes(doc, '[data-ice="description"]', 'this is static method1.');
        });
      })
    });

    it('has member.', ()=>{
      find(doc, '[data-ice="memberDetails"]', (doc)=>{
        find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
          assert.includes(doc, '#instance-member-p1', 'public p1: number');
          assert.includes(doc, '#instance-member-p1 + [data-ice="description"]', 'this is p1.');
        });

        find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
          assert.includes(doc, '#instance-get-value1', 'public get value1: number');
          assert.includes(doc, '#instance-get-value1 + [data-ice="description"]', 'this is get value1.');
        });

        find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
          assert.includes(doc, '#instance-set-value2', 'public set value2: number');
          assert.includes(doc, '#instance-set-value2 + [data-ice="description"]', 'this is set value2.');
        });
      })
    });

    it('has constructor detail.', ()=>{
      find(doc, '[data-ice="constructorDetails"]', (doc)=>{
        find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
          assert.includes(doc, '#instance-constructor-constructor', 'public constructor()');
          assert.includes(doc, '#instance-constructor-constructor + [data-ice="description"]', 'this is constructor.');
        });
      })
    });

    it('has method detail.', ()=>{
      find(doc, '[data-ice="methodDetails"]', (doc)=>{
        find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=> {
          assert.includes(doc, '#instance-method-method1', 'public method1()');
          assert.includes(doc, '#instance-method-method1 ~ [data-ice="description"]', 'this is method1.');
        });
      })
    });
  });
});
