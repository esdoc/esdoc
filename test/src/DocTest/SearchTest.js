import fs from 'fs';
import assert from 'assert';

describe('test search', ()=>{
  const searchIndexJS = fs.readFileSync('./test/fixture/esdoc/script/search_index.js', {encoding: 'utf8'}).toString();
  const searchIndexJSON = searchIndexJS.replace('window.esdocSearchIndex = ', '');
  const searchIndex = JSON.parse(searchIndexJSON);

  function find(searchIndex, url) {
    const results = [];
    for (const item of searchIndex) {
      if (item[1] === url) results.push(item);
    }

    if (results.length > 1) assert(false, `some ${url} found. results = ${results}`);

    return results[0];
  }

  it('has class index', ()=>{
    assert.deepEqual(find(searchIndex, 'class/src/Desc/Class.js~TestDescClass.html'), [
      "esdoc-test-fixture/src/desc/class.js~testdescclass",
      "class/src/Desc/Class.js~TestDescClass.html",
      "<span>TestDescClass</span> <span class=\"search-result-import-path\">esdoc-test-fixture/src/Desc/Class.js</span>",
      "class"
    ]);
  });

  it('has member index', ()=>{
    assert.deepEqual(find(searchIndex, 'class/src/Desc/Class.js~TestDescClass.html#instance-member-p1'), [
      "src/desc/class.js~testdescclass#p1",
      "class/src/Desc/Class.js~TestDescClass.html#instance-member-p1",
      "src/Desc/Class.js~TestDescClass#p1",
      "member"
    ]);
  });

  it('has method index', ()=>{
    assert.deepEqual(find(searchIndex, 'class/src/Desc/Class.js~TestDescClass.html#instance-method-method1'), [
      "src/desc/class.js~testdescclass#method1",
      "class/src/Desc/Class.js~TestDescClass.html#instance-method-method1",
      "src/Desc/Class.js~TestDescClass#method1",
      "method"
    ]);
  });

  it('has interface index', ()=>{
    assert.deepEqual(find(searchIndex, 'class/src/Interface/Definition.js~TestInterfaceDefinition.html'), [
      "esdoc-test-fixture/src/interface/definition.js~testinterfacedefinition",
      "class/src/Interface/Definition.js~TestInterfaceDefinition.html",
      "<span>TestInterfaceDefinition</span> <span class=\"search-result-import-path\">esdoc-test-fixture/src/Interface/Definition.js</span>",
      "class"
    ]);
  });

  it('has function index', ()=>{
    assert.deepEqual(find(searchIndex, 'function/index.html#static-function-testDescFunction'), [
      "esdoc-test-fixture/src/desc/function.js~testdescfunction",
      "function/index.html#static-function-testDescFunction",
      "<span>testDescFunction</span> <span class=\"search-result-import-path\">esdoc-test-fixture/src/Desc/Function.js</span>",
      "function"
    ]);
  });

  it('has variable index', ()=>{
    assert.deepEqual(find(searchIndex, 'variable/index.html#static-variable-testDescVariable'), [
      "esdoc-test-fixture/src/desc/variable.js~testdescvariable",
      "variable/index.html#static-variable-testDescVariable",
      "<span>testDescVariable</span> <span class=\"search-result-import-path\">esdoc-test-fixture/src/Desc/Variable.js</span>",
      "variable"
    ]);
  });

  it('has typedef index', ()=>{
    assert.deepEqual(find(searchIndex, 'typedef/index.html#static-typedef-TestTypedefDefinition'), [
      "src/typedef/definition.js~testtypedefdefinition",
      "typedef/index.html#static-typedef-TestTypedefDefinition",
      "src/Typedef/Definition.js~TestTypedefDefinition",
      "typedef"
    ]);
  });

  it('has external index', ()=>{
    assert.deepEqual(find(searchIndex, 'http://example.com'), [
      "src/external/definition.js~testexternaldefinition",
      "http://example.com",
      "src/External/Definition.js~TestExternalDefinition",
      "external"
    ]);
  });

  it('has file index', ()=>{
    assert.deepEqual(find(searchIndex, 'file/src/Desc/Class.js.html'), [
      "src/desc/class.js",
      "file/src/Desc/Class.js.html",
      "src/Desc/Class.js",
      "file"
    ]);
  });

  it('has test file index', ()=>{
    assert.deepEqual(find(searchIndex, 'test-file/test/DescTest.js.html'), [
      "test/desctest.js",
      "test-file/test/DescTest.js.html",
      "test/DescTest.js",
      "testFile"
    ]);
  });

  it('has test index', ()=>{
    assert.deepEqual(find(searchIndex, 'test-file/test/DescTest.js.html#lineNumber2'), [
      "testdescclass src/desc/class.js~testdescclass,testdescclass",
      "test-file/test/DescTest.js.html#lineNumber2",
      "Use describe style mocha interface",
      "test"
    ]);
  });
});
