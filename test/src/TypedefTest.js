import assert from 'power-assert';

describe('MyTypedef:', ()=> {
  let db = global.db;

  it('has MyTypedef1.', ()=> {
    let docs = db.find({name: 'MyTypedef1'});
    assert.equal(docs.length, 1);
    assert.deepEqual(docs[0],
    {
      "kind": "typedef",
      "static": true,
      "variation": null,
      "name": "MyTypedef1",
      "memberof": "src/MyTypedef.js",
      "longname": "src/MyTypedef.js~MyTypedef1",
      "access": null,
      "description": "this is MyTypedef1 desc.",
      "type": {
        "types": [
          "Object"
        ],
        "optional": false,
        "name": "MyTypedef1"
      }
    });
  });
});
