import assert from 'power-assert';

describe('MyClass1:', ()=>{
  let db = global.db;

  it('has class doc.', ()=>{
    let docs = db.find({name: 'MyClass1'});
    assert.equal(docs.length, 1);

    let doc = docs[0];
    assert.deepEqual(doc, {
      desc: 'this is MyClass1 desc.\nthis is second line.',
      example: [
        'let foo = 10;\nlet bar = 20;',
        'for (let v of values) {\n  let foo = v;\n}'
      ],
      kind: 'class',
      name: 'MyClass1',
      memberof: null,
      longname: 'src/MyClass1.js~MyClass1',
      static: true,
      export: true,
      importPath: 'esdoc/null/src/MyClass1.js',
      importStyle: 'MyClass1',
      extends: [ 'src/OtherClass/SuperMyClass.js~SuperMyClass' ]
    });
  });
});
