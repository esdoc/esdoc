import assert from 'power-assert';

describe('myVariables:', ()=> {
  let db = global.db;

  it('has myVariable1.', ()=>{
    let docs = db.find({name: 'myVariable1'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "variable",
      "static": true,
      "variation": null,
      "name": "myVariable1",
      "memberof": "src/myVariable.js",
      "longname": "src/myVariable.js~myVariable1",
      "access": null,
      "export": true,
      "importPath": "esdoc-test-fixture/src/myVariable.js",
      "importStyle": "myVariable1",
      "description": "this is myVariable1 desc."
    });
  });

  it('has myVariable2.', ()=>{
    let docs = db.find({name: 'myVariable2'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "variable",
      "static": true,
      "variation": null,
      "name": "myVariable2",
      "memberof": "src/myVariable.js",
      "longname": "src/myVariable.js~myVariable2",
      "access": null,
      "export": true,
      "importPath": "esdoc-test-fixture/src/myVariable.js",
      "importStyle": "{myVariable2}",
      "description": "this is myVariable2 desc."
    });
  });

  it('has myVariable3.', ()=>{
    let docs = db.find({name: 'myVariable3'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "variable",
      "static": true,
      "variation": null,
      "name": "myVariable3",
      "memberof": "src/myVariable.js",
      "longname": "src/myVariable.js~myVariable3",
      "access": null,
      "export": false,
      "importPath": "esdoc-test-fixture/src/myVariable.js",
      "importStyle": null,
      "description": "this is myVariable3 desc."
    });
  });
});
