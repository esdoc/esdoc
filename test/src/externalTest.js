import assert from 'power-assert';

describe('external:', ()=> {
  let db = global.db;

  it('has string external.', ()=> {
    let docs = db.find({name: 'string'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "external",
      "static": true,
      "variation": null,
      "name": "string",
      "memberof": "src/external.js",
      "longname": "src/external.js~string",
      "access": null,
      "description": null,
      "see": [
        "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String"
      ]
    });
  });

  it('has XMLHttpRequest external.', ()=>{
    let docs = db.find({name: 'XMLHttpRequest'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "external",
      "static": true,
      "variation": null,
      "name": "XMLHttpRequest",
      "memberof": "src/external.js",
      "longname": "src/external.js~XMLHttpRequest",
      "access": null,
      "description": null,
      "see": [
        "https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest"
      ]
    });
  });
});
