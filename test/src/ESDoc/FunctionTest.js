import assert from 'power-assert';

describe('myFunctions:', ()=> {
  let db = global.db;

  it('has myFunction1.', ()=>{
    let docs = db.find({name: 'myFunction1'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "function",
      "static": true,
      "variation": null,
      "name": "myFunction1",
      "memberof": "src/myFunction.js",
      "longname": "src/myFunction.js~myFunction1",
      "access": null,
      "export": true,
      "importPath": "esdoc-test-fixture/src/myFunction.js",
      "importStyle": "myFunction1",
      "description": "this is myFunction1 desc."
    });
  });

  it('has myFunction2.', ()=>{
    let docs = db.find({name: 'myFunction2'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "function",
      "static": true,
      "variation": null,
      "name": "myFunction2",
      "memberof": "src/myFunction.js",
      "longname": "src/myFunction.js~myFunction2",
      "access": null,
      "export": true,
      "importPath": "esdoc-test-fixture/src/myFunction.js",
      "importStyle": "{myFunction2}",
      "description": "this is myFunction2 desc.",
      "params": [
        {
          "nullable": null,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": false,
          "name": "p1",
          "description": "this is p1 desc."
        },
        {
          "nullable": null,
          "types": [
            "string"
          ],
          "spread": false,
          "optional": false,
          "name": "p2",
          "description": "this is p2 desc."
        }
      ]
    });
  });

  it('has myFunction3.', ()=>{
    let docs = db.find({name: 'myFunction3'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "function",
      "static": true,
      "variation": null,
      "name": "myFunction3",
      "memberof": "src/myFunction.js",
      "longname": "src/myFunction.js~myFunction3",
      "access": null,
      "export": true,
      "importPath": "esdoc-test-fixture/src/myFunction.js",
      "importStyle": "{myFunction3}",
      "description": "this is myFunction3 desc.",
      "return": {
        "nullable": null,
        "types": [
          "number"
        ],
        "spread": false,
        "description": "this is return desc."
      }
    });
  });

  it('has myFunction4.', ()=>{
    let docs = db.find({name: 'myFunction4'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "function",
      "static": true,
      "variation": null,
      "name": "myFunction4",
      "memberof": "src/myFunction.js",
      "longname": "src/myFunction.js~myFunction4",
      "access": null,
      "export": false,
      "importPath": "esdoc-test-fixture/src/myFunction.js",
      "importStyle": null,
      "description": "this is myFunction4 desc.",
      "params": [
        {
          "nullable": null,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": false,
          "name": "p1",
          "description": ""
        },
        {
          "nullable": null,
          "types": [
            "string"
          ],
          "spread": false,
          "optional": false,
          "name": "p2",
          "description": ""
        }
      ],
      "return": {
        "nullable": null,
        "types": [
          "number"
        ],
        "spread": false,
        "description": "this is return desc."
      }
    });
  });

  it('has myFunction5.', ()=>{
    let docs = db.find({name: 'myFunction5'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "function",
      "static": true,
      "variation": null,
      "name": "myFunction5",
      "memberof": "src/myFunction.js",
      "longname": "src/myFunction.js~myFunction5",
      "access": null,
      "export": false,
      "importPath": "esdoc-test-fixture/src/myFunction.js",
      "importStyle": null,
      "description": "this is myFunction5 desc.",
      "properties": [
        {
          "nullable": null,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": false,
          "name": "p1",
          "description": "this is p1 of return value."
        }
      ],
      "params": [
        {
          "nullable": null,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": false,
          "name": "p1",
          "description": ""
        },
        {
          "nullable": null,
          "types": [
            "string"
          ],
          "spread": false,
          "optional": false,
          "name": "p2",
          "description": ""
        }
      ],
      "return": {
        "nullable": null,
        "types": [
          "Object"
        ],
        "spread": false,
        "description": "this is return desc."
      }
    });
  });
});
