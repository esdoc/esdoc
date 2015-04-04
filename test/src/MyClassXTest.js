import assert from './Util/assert.js';

describe('MyClassX:', ()=>{
  let db = global.db;

  it('has optional doc annotation.', ()=>{
    let docs = db.find({name: 'MyClassX'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "class",
      "static": true,
      "variation": null,
      "name": "MyClassX",
      "memberof": "src/MyClassX.js",
      "longname": "src/MyClassX.js~MyClassX",
      "access": null,
      "export": true,
      "importPath": "esdoc-test-fixture/src/MyClassX.js",
      "importStyle": "MyClassX",
      "description": "this is MyClassX desc.",
      "lineNumber": 4,
      "interface": false
    });
  });
});
