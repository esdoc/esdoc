import assert from './Util/assert.js';

describe('MyClass1:', ()=>{
  let db = global.db;
  let classDoc = db.find({name: 'MyClass1'})[0];

  it('has class doc.', ()=>{
    let docs = db.find({name: 'MyClass1'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "class",
      "static": true,
      "variation": null,
      "name": "MyClass1",
      "memberof": "src/MyClass.js",
      "longname": "src/MyClass.js~MyClass1",
      "access": null,
      "export": true,
      "importPath": "esdoc-test-fixture",
      "importStyle": "MyClass1",
      //"description": "this is MyClass1 desc.\nthis is second line.",
      "examples": [
        "let foo = 10;\nlet bar = 20;",
        "for (let v of values) {\n  let foo = v;\n}"
      ],
      "interface": false,
      "extends": [
        "src/OtherClass/SuperMyClass.js~SuperMyClass1"
      ]
    });
  });

  it('has static get method.', ()=>{
    let docs = db.find({name: 'staticValue', kind: 'get', memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "get",
      "static": true,
      "variation": null,
      "name": "staticValue",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1.staticValue",
      "access": null,
      "description": "this is staticValue(get) desc.",
      "type": {
        "nullable": null,
        "types": [
          "number"
        ],
        "spread": false,
        "description": null
      }
    });
  });

  it('has static set method.', ()=>{
    let docs = db.find({name: 'staticValue', kind: 'set', memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "set",
      "static": true,
      "variation": null,
      "name": "staticValue",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1.staticValue",
      "access": null,
      "description": "this is staticValue(set) desc.",
      "type": {
        "nullable": null,
        "types": [
          "number"
        ],
        "spread": false,
        "description": null
      }
    });
  });

  it('has static method.', ()=>{
    let docs = db.find({name: 'staticMethod', kind: 'method', memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "method",
      "static": true,
      "variation": null,
      "name": "staticMethod",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1.staticMethod",
      "access": null,
      "description": "this is staticMethod desc."
    });
  });

  it('has static member.', ()=>{
    let docs = db.find({name: '_p1', kind: 'member', static: true, memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "member",
      "static": true,
      "variation": null,
      "name": "_p1",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1._p1",
      "access": "private",
      "description": "this is static _p1 desc.",
      "type": {
        "nullable": null,
        "types": [
          "number"
        ],
        "spread": false,
        "description": null
      }
    });
  });

  it('has constructor.', ()=>{
    let docs = db.find({kind: 'constructor', memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "constructor",
      "static": false,
      "variation": null,
      "name": "constructor",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1#constructor",
      "access": null,
      "description": "this is constructor desc.",
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
        }
      ]
    });
  });

  it('has get method.', ()=>{
    let docs = db.find({kind: 'get', name: 'value', memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "get",
      "static": false,
      "variation": null,
      "name": "value",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1#value",
      "access": null,
      "description": "this is value(get) desc.",
      "type": {
        "nullable": null,
        "types": [
          "number"
        ],
        "spread": false,
        "description": null
      }
    });
  });

  it('has set method.', ()=>{
    let docs = db.find({kind: 'set', name: 'value', memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "set",
      "static": false,
      "variation": null,
      "name": "value",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1#value",
      "access": null,
      "description": "this is value(set) desc.",
      "type": {
        "nullable": null,
        "types": [
          "number"
        ],
        "spread": false,
        "description": null
      }
    });
  });

  it('has member.', ()=>{
    let docs = db.find({kind: 'member', name: '_p1', static: false, memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "member",
      "static": false,
      "variation": null,
      "name": "_p1",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1#_p1",
      "access": "private",
      "description": "this is _p1 desc.",
      "type": {
        "nullable": null,
        "types": [
          "number"
        ],
        "spread": false,
        "description": null
      }
    });
  });

  it('has method.', ()=>{
    let docs = db.find({kind: 'method', name: 'method', memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "method",
      "static": false,
      "variation": null,
      "name": "method",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1#method",
      "access": null,
      "description": "this is method desc.",
      "params": [
        {
          "nullable": null,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": false,
          "name": "p1",
          "description": "this is p1(simple) desc."
        },
        {
          "nullable": false,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": false,
          "name": "p2",
          "description": "this is p2(not nullable) desc."
        },
        {
          "nullable": true,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": false,
          "name": "p3",
          "description": "this is p3(nullable) desc."
        },
        {
          "nullable": null,
          "types": [
            "number",
            "string[]"
          ],
          "spread": false,
          "optional": false,
          "name": "p4",
          "description": "this is p4(union) desc."
        },
        {
          "nullable": null,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": true,
          "name": "p5",
          "description": "this is p5(optional) desc."
        },
        {
          "nullable": null,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": true,
          "defaultValue": "123",
          "defaultRaw": 123,
          "name": "p6",
          "description": "this is p4(default) desc."
        },
        {
          "nullable": null,
          "types": [
            "{a: number, b: string}"
          ],
          "spread": false,
          "optional": false,
          "name": "p7",
          "description": "this is p7(object) desc."
        },
        {
          "nullable": null,
          "types": [
            "Object"
          ],
          "spread": false,
          "optional": false,
          "name": "p8",
          "description": "this is p8(nest) desc."
        },
        {
          "nullable": null,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": false,
          "name": "p8.a",
          "description": "this is p8.a(nest) desc."
        },
        {
          "nullable": null,
          "types": [
            "string"
          ],
          "spread": false,
          "optional": false,
          "name": "p8.b",
          "description": "this is p8.b(nest) desc."
        },
        {
          "nullable": false,
          "types": [
            "number",
            "string[]",
            "{a: number, b: string}"
          ],
          "spread": false,
          "optional": false,
          "name": "p9",
          "description": "this is p9(complex) desc.\nthis is second line."
        }
      ],
      "properties": [
        {
          "nullable": null,
          "types": [
            "number"
          ],
          "spread": false,
          "optional": false,
          "name": "p1",
          "description": "this is p1 of return desc."
        },
        {
          "nullable": null,
          "types": [
            "string[]"
          ],
          "spread": false,
          "optional": false,
          "name": "p2",
          "description": "this is p2 of return desc."
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

  it('has protected method.', ()=>{
    let docs = db.find({kind: 'method', name: 'protectedMethod', memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "method",
      "static": false,
      "variation": null,
      "name": "protectedMethod",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1#protectedMethod",
      "access": "protected",
      "description": "this is protectedMethod desc."
    });
  });

  it('has private method.', ()=>{
    let docs = db.find({kind: 'method', name: 'privateMethod', memberof: classDoc.longname});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "method",
      "static": false,
      "variation": null,
      "name": "privateMethod",
      "memberof": "src/MyClass.js~MyClass1",
      "longname": "src/MyClass.js~MyClass1#privateMethod",
      "access": "private",
      "description": "this is privateMethod desc."
    });
  })
});

describe('MyClass2:', ()=> {
  let db = global.db;

  it('has class doc.', ()=> {
    let docs = db.find({name: 'MyClass2'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "class",
      "static": true,
      "variation": null,
      "name": "MyClass2",
      "memberof": "src/MyClass.js",
      "longname": "src/MyClass.js~MyClass2",
      "access": null,
      "export": true,
      "importPath": "esdoc-test-fixture",
      "importStyle": "{MyClass2}",
      "description": "this is MyClass2 desc.",
      "interface": false
    });
  });
});

describe('MyClass3:', ()=> {
  let db = global.db;

  it('has class doc.', ()=> {
    let docs = db.find({name: 'MyClass3'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "class",
      "static": true,
      "variation": null,
      "name": "MyClass3",
      "memberof": "src/MyClass.js",
      "longname": "src/MyClass.js~MyClass3",
      "access": null,
      "export": false,
      "importPath": "esdoc-test-fixture",
      "importStyle": null,
      "description": "this is MyClass3 desc.",
      "interface": false
    });
  });
});

describe('MyClass4:', ()=> {
  let db = global.db;

  it('has class doc.', ()=> {
    let docs = db.find({name: 'MyClass4'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
      {
        "kind": "class",
        "static": true,
        "variation": null,
        "name": "MyClass4",
        "memberof": "src/MyClass.js",
        "longname": "src/MyClass.js~MyClass4",
        "access": null,
        "export": false,
        "importPath": "esdoc-test-fixture",
        "importStyle": null,
        "description": "this is MyClass4 desc.",
        "interface": true
      });
  });
});

describe('SuperMyClass1:', ()=> {
  let db = global.db;

  it('has class doc.', ()=> {
    let docs = db.find({name: 'SuperMyClass1'});
    assert.equal(docs.length, 1);
    assert.doc(docs[0],
    {
      "kind": "class",
      "static": true,
      "variation": null,
      "name": "SuperMyClass1",
      "memberof": "src/OtherClass/SuperMyClass.js",
      "longname": "src/OtherClass/SuperMyClass.js~SuperMyClass1",
      "access": null,
      "export": true,
      "importPath": "esdoc-test-fixture/src/OtherClass/SuperMyClass.js",
      "importStyle": "SuperMyClass1",
      "description": "this is SuperMyClass1.",
      "interface": false
    });
  });
});
