import assert from 'power-assert';
import fs from 'fs';

describe('files:', ()=> {
  let db = global.db;

  it('has MyClass.js file.', ()=>{
    let content = fs.readFileSync('./test/fixture/src/MyClass.js').toString();
    let docs = db.find({kind: 'file', name: 'src/MyClass.js'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "file",
      "static": true,
      "variation": null,
      "name": "src/MyClass.js",
      "memberof": null,
      "longname": "src/MyClass.js",
      "access": null,
      "description": null,
      "content": content
    });
  });

  it('has SuperMyClass.js file.', ()=>{
    let content = fs.readFileSync('./test/fixture/src/OtherClass/SuperMyClass.js').toString();
    let docs = db.find({kind: 'file', name: 'src/OtherClass/SuperMyClass.js'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "file",
      "static": true,
      "variation": null,
      "name": "src/OtherClass/SuperMyClass.js",
      "memberof": null,
      "longname": "src/OtherClass/SuperMyClass.js",
      "access": null,
      "description": null,
      "content": content
    });
  });
});
